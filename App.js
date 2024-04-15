import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import ButtonComponent from "./components/batton.jsx";
import Home from "./components/home.jsx";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import SignupSecurity from "./pages/student/signup.student.jsx";
import Dashboard from "./components/welcome.jsx";
import tw from "twrnc";

const  Stack = createNativeStackNavigator()

export default function App() {

  return (
 
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} style={tw`flex items-center justify-center`}/>
        <Stack.Screen name="Dashboard" component={Dashboard}/>
        <Stack.Screen name="Create Accout" component={SignupSecurity}/>
      </Stack.Navigator>

    </NavigationContainer>

  );
}
