import React, { useState, useRef, useEffect } from "react";
import { View, Text, Button, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FaceDetector from "expo-face-detector";
import { Camera } from "expo-camera";
import API_KEY_HOST from "../../config/hostLink.js";

export default function Signup() {
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState(null);

  const selectImage = async () => {
    const { status } = await ImagePicker.getCameraPermissionsAsync();
    if (status !== "granted") {
      // Request camera permissions if not granted
      const { status: newStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      if (newStatus !== "granted") {
        Alert.alert("Permission denied", "Camera permission is required");
        return;
      }
    }

    console.log("Camera permission status:", status);

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      cameraType: ImagePicker.CameraType.front,
      quality: 1,
    });

    console.log("Image picker result:", result);

    if (!result.canceled && result.uri) {
      setImage(result.uri);
      await recognizeFace(result.uri);
    } else {
      console.log("Image capture cancelled or no URI returned:", result.uri);
      return;
    }
  };

  const recognizeFace = async (base64Image) => {
    try {
      const response = await fetch(`${API_KEY_HOST}/face-store`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ base64Image }),
      });

      if (!response.ok) {
        throw new Error("Failed to save image");
      }

      const data = await response.json();
      console.log("Image saved:", data.message);
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to recognize face");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take Picture" onPress={selectImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {username && <Text style={styles.username}>Welcome, {username}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
