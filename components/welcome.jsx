import { Button, Text } from "react-native";
import { View } from "react-native";

import { Table, Row, Rows } from "react-native-table-component";
import tw from "twrnc";

export default Dashboard = () => {
  const tableData = [
    ["Names", "Reg Number", "Telephone"],
    ["Kwizera Elisa", "22RP00159", "0787647168"],
    ["Shikamusenge Philemon", "22RP00029", "0787647169"],
    ["Umuhoza Josiane", "22RP00456", "0787647190"],
  ];
  return (
    <View style={tw`flex-col gap-3 justify-center mt-10 gap-10`}>
      <View style={tw`items-center bg-slate-500 justify-center`}>
        <Text style={tw`text-6 capitalize font-semibold`}>
          welcome to Security DashBoard
        </Text>
      </View>
      <View style={tw`flex gap-5 mx-4`}>
        <View style={tw`flex gap-20`}>
          <View style={tw` flex-row justify-between gap-30`}>
            <View>
              <Button title="View Checked" />
            </View>

            <View>
              <Button title="View Checked" />
            </View>
          </View>

          {/* View The checked Student */}
          <View style={tw`flex-col gap-5`}>
            {/* title */}

            <Text style={tw`text-center mt-4 text-5 bg-slate-300`}>
              List of Checked student
            </Text>
            <View style={tw`justify-center`}>
              <Table style={tw`border`}>
                <Row data={tableData[0]} style={tw`flex-row text-10 font-bold border`}/>
                <Rows data={tableData.slice(1)} style={tw`flex-row text-10 my-2 px-3`}/>
              </Table>
            </View>
          </View>
        </View>
        <View style={tw` flex-row justify-end gap-10`}>
            <View>
              <Button title="Previouse" />
            </View>
                <Text style={tw`text-5`}>1 of 1</Text>
            <View>
              <Button title="Next" />
            </View>
          </View>

      </View>
    </View>
  );
};
