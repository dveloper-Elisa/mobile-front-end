import { TextInput, View, Text } from "react-native"
import ButtonComponent from "./batton"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import tw from "twrnc"

import Icon from "react-native-vector-icons/FontAwesome5"


import API_KEY_HOST from "../comfing/app.js"

export default Home=()=>{
    const navigation = useNavigation()

    const [Sname,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [data, setData] = useState("")

    const handleLogin = async()=>{
         try{
            const url = `${API_KEY_HOST}/security/login`
            const login = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ Sname, password })
            });

            if(login.ok){
                const logedSecurity = await login.json()
                navigation.navigate("Dashboard")
                return setData(logedSecurity.message)
            }

            return setData("usernotFoun")
         }catch(error){
            return console.log(error)
         }
    }

return (
    <View style={tw`flex mx-4`}>

        <View style={tw`items-center `}>
<View  style={tw`items-center p-10 opacity-50 bg-slate-400 w-fit rounded-50`}>

            <Icon name="lock" size={100}/>
</View>
        </View>


        <Text style={tw`text-red-400`}>{data}</Text>

        <View style={tw`gap-5`}>
            <View style={tw`flex text-center items-center`}>
                <Text style={tw`font-bold text-5`}>Security Guard login page</Text>
            </View>

            <View style={tw`gap-4`}>
                <TextInput value={Sname} onChangeText={(text)=>{setUserName(text)}} placeholder="Email / Telphone" style={tw`border-2 px-2 py-1 text-[20px] rounded-md`}>
                </TextInput>


                <TextInput secureTextEntry placeholder="Password" value={password} onChangeText={setPassword} style={tw`border-2 px-2 py-1 text-[20px] rounded-md`}>
                    </TextInput>
            </View>

            <View>
                <ButtonComponent text={"Login"} onPress={()=>{
                    handleLogin()
                    // navigation.navigate("Create Accout")
                }}/>
                {/* <ButtonComponent /> */}
            </View>
        </View>
    </ View>
)

}