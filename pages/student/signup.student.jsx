
import React from "react";
// import { Formik } from "formik";
import { SafeAreaView, View, Text, TextInput, Button } from "react-native";
import tw from "twrnc"


export default SignupSecurity = ()=>{

    return (
        <SafeAreaView>
            <View>
                <Text style={tw`text-[20px]`}>
                    Welcome to security SignUp
                </Text>

                {/* <Formik 
                initialValues={{name:"",email:"",nid:"", telephone:"", password:"",regNumber:""}}>
{({values, handleChange, errors,setFieldTouched, touched, isValid,handleSubmit})=>( */}
    <View>
        <TextInput
        value={values.name}
        onChange={handleChange("name")}
        onBlur={()=>setFieldTouched("name")}
        placeholder="Name here"
        />

        {touched.name && errors.name && <Text style={tw`text-red-400`}>{errors.name}</Text>}


        <Button 
        title="SignUp"
        disabled={!isValid}
        onPress={
            handleSubmit()
        }
        />

    </View>
)}
                {/* </Formik> */}
            </View>
        </SafeAreaView>
    )
}
