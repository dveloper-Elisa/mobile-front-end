import { TextInput, View, Text } from "react-native"
import ButtonComponent from "./batton"
import { useState } from "react"
import tw from "twrnc"


import API_KEY_HOST from "../comfing/app.js"

export default Home=()=>{

    const [Sname,setUserName] = useState("")
    const [password,setPassword] = useState("")

    const [data, setData] = useState("")

    const handleLogin = async()=>{
         try{
            const url = `${API_KEY_HOST}/security/login`
            // const url ="http://192.168.43.118:3000/security/login"
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
    <View style={tw`flex`}>

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
                }}/>
            </View>
        </View>
    </ View>
)

}