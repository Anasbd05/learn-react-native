import { Text, View } from "react-native";
import tw from "twrnc";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={tw`text-2xl font-bold text-green-800`}>Home page</Text>
    </View>
  );
}
