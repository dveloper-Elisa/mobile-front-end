import React from "react";

import { Formik } from "formik";
import * as yup from "yup";
import { Alert } from "react-native";

import { SafeAreaView, View, Text, TextInput, Button,TouchableOpacity } from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import API_KEY_HOST from"../../comfing/app.js"

export default SignupSecurity = () => {

    const navigation = useNavigation()


  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is require"),
    email: yup.string().email("Enter valid email").required("Email required"),
    nid: yup.string().required("ID is required").min(16,"ID must have 16 values"),
    telephone: yup.string().required("Phone number required"),
    password: yup.string().min(8,"Password must contain atleast 8 characters").required("Password required"),
    regNumber: yup.string().min(7).required("Reg number is required"),
  });

  // HANDLING SUBMIT
  const handleSubmit = async (values) => {
    console.log("Form values are", values);
    try{
      const register = await fetch(`${API_KEY_HOST}/student-signup`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(values)})

      if(register.ok){
        const insert = await register.json();
        Alert.alert("Register",insert.message)
        navigation.navigate("Dashboard");
        // console.log(insert.message);
      }else{
        console.log()
        Alert.alert("Error","Student not Registered!!")
      }
    }catch(error){
      console.log("Error is :",error)
    }
  };

  return (
    <SafeAreaView style={tw`gap-5 mt-5`}>
        <Text style={tw`text-6 font-bold text-white bg-slate-500 text-center p-5`}>Welcome to student SignUp</Text>
      <View style={tw`mx-4`}>

        <Formik
          initialValues={{
            name: "",
            email: "",
            nid: "",
            telephone: "",
            password: "",
            regNumber: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <View style={tw`flex gap-2`}>
              <TextInput
                style={tw`border p-2 text-5 font-sans rounded-lg`}
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={() => setFieldTouched("name")}
                placeholder="Name here"
              />

              {touched.name && errors.name && (
                <Text style={tw`text-red-400`}>{errors.name}</Text>
              )}

              <TextInput
                style={tw`border p-2 text-5 rounded-lg`}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                placeholder="Enter your email"
              />
              {touched.email && errors.email && (
                <Text style={tw`text-red-400`}>{errors.email}</Text>
              )}

              <TextInput
                style={tw`border p-2 text-5 rounded-lg`}
                value={values.nid}
                onChangeText={handleChange("nid")}
                onBlur={() => setFieldTouched("nid")}
                placeholder="Enter your ID"
              />
              {touched.nid && errors.nid && (
                <Text style={tw`text-red-400`}>{errors.nid}</Text>
              )}

              <TextInput
                style={tw`border p-2 text-5 rounded-lg`}
                value={values.telephone}
                onChangeText={handleChange("telephone")}
                onBlur={() => setFieldTouched("telephone")}
                placeholder="Enter your telephone"
              />
              {touched.telephone && errors.telephone && (
                <Text style={tw`text-red-400`}>{errors.telephone}</Text>
              )}

              <TextInput
                style={tw`border p-2 text-5 rounded-lg`}
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
                placeholder="Enter your password"
              />
              {touched.password && errors.password && (
                <Text style={tw`text-red-400`}>{errors.password}</Text>
              )}

              <TextInput
                style={tw`border p-2 text-5 rounded-lg`}
                value={values.regNumber}
                onChangeText={handleChange("regNumber")}
                onBlur={() => setFieldTouched("regNumber")}
                placeholder="Enter your regNumber"
              />
              {touched.regNumber && errors.regNumber && (
                <Text style={tw`text-red-400`}>{errors.regNumber}</Text>
              )}

              <Button
                title="SignUp"
                disabled={!isValid}
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik>

        {/*MAKING FOOTER OF THE LOGIN  */}

        <TouchableOpacity>
            <Text style={tw`text-4`}>
              If have account login
              <Text
                style={tw`text-blue-500 hover:bg-red-400 hover:text-white`}
                onPress={() => navigation.navigate("Home")}
              >
                here
              </Text>
            </Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
