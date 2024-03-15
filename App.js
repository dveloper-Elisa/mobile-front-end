import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import ButtonComponent from "./components/batton.jsx";
import Home from "./components/home.jsx";
import tw from "twrnc";

export default function App() {
  const [inputText, setInputText] = useState("");

  const seeName = () => {
    alert("Your Name" + " " + inputText);
  };
  return (
    <View style={tw`flex-col gap-5 top-5`}>
      <View style={tw`flex items-center bg-[#ccc] p-2 w-[100] `}>
        <Text style={tw`text-black font-900`}>Secrity Checker System</Text>
      </View>
      <View style={tw`m-4`}>
        <Home />
      </View>
    </View>
  );
}
