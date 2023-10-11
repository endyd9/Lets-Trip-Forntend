import { View, Text } from "react-native";

export default function Post({ route }) {
  console.log(route.params);
  return (
    <View>
      <Text>짜잔</Text>
    </View>
  );
}
