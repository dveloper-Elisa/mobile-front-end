import { TextInput, View, Text, TouchableOpacity, Alert, Button } from "react-native";
import ButtonComponent from "./batton";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";

import * as yup from "yup";
import { Formik } from "formik";

import Icon from "react-native-vector-icons/FontAwesome5";

import API_KEY_HOST from "../comfing/app.js";

export default Home = () => {
  const navigation = useNavigation();

  const [Sname, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");

  // MAKE VALIDATION SCHEMA FOR LOGIN

  const validationSchema = yup.object().shape({
    Sname: yup.string().required("Email/ telephone is required"),
    password: yup
      .string()
      .required("password is requred")
      .min(3, "Password should be not below 8 characters"),
  });

  const handleLogin = async (values) => {
    try {
      const url = `${API_KEY_HOST}/security/login`;
      const login = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values ),
      });

      if (login.ok) {
        const logedSecurity = await login.json();
        Alert.alert("Success",logedSecurity.message);
        navigation.navigate("Dashboard");
        return setData(logedSecurity.message);
      }
      Alert.alert("Faliure","Incorect email or Password")
      return setData("usernotFoun");
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <View style={tw`flex mx-2 p-2`}>
      <View style={tw`items-center`}>
        <View
          style={tw`items-center p-10 opacity-50 bg-slate-400 w-fit rounded-50`}
        >
          <Icon name="lock" size={100} />
        </View>
      </View>

      <View style={tw`gap-10 relative -top-15`}>
        <Text style={tw`text-red-400`}>{data}</Text>
        <View style={tw`flex text-center items-center`}>
          <Text style={tw`font-bold text-5`}>Security Guard login page</Text>
        </View>

        <View style={tw`gap-4`}>
          <Formik
            initialValues={{
              Sname: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({
              values,
              errors,
              handleSubmit,
              handleChange,
              setFieldTouched,
              touched,
              isValid,
            }) => (
              <View style={tw`flex gap-5`}>
                <TextInput
                  value={values.Sname}
                  onChangeText={handleChange("Sname")}
                  onBlur={() => setFieldTouched("Sname")}
                  placeholder="Email / Telphone"
                  style={tw`border-2 px-4 py-1 text-5 rounded-md`}
                />
                {touched.Sname && errors.Sname && <Text style={tw`text-red-400 capitalize`}>{errors.Sname}</Text>}

                <TextInput
                  value={values.password}
                  secureTextEntry
                  placeholder="Password"
                  onChangeText={handleChange("password")}
                  onBlur={() => setFieldTouched("password")}
                  style={tw`border-2 px-4 py-1 text-5 rounded-md`}
                />
                {touched.password && errors.password && (
                  <Text style={tw`text-red-400 capitalize`}>{errors.password}</Text>
                )}
                {/* </View> */}

                <View style={tw`flex gap-2`}>
                  <Button title={"Login"} disabled={!isValid} onPress={handleSubmit} />
                </View>
              </View>
            )}
          </Formik>
        </View>

        {/*MAKING FOOTER OF THE LOGIN  */}

        <TouchableOpacity>
          <Text style={tw`text-4`}>
            If have no account SignUp{" "}
            <Text
              style={tw`text-blue-500 hover:bg-red-400 hover:text-white`}
              onPress={() => navigation.navigate("Create Accout")}
            >
              here
            </Text>
          </Text>
        </TouchableOpacity>
        {/* <ButtonComponent /> */}
      </View>
    </View>
    // </View>
  );
};
