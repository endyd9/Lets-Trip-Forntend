import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { userSlice } from "../store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function My({ navigation }) {
  const dispatch = useDispatch();
  const logout = async () => {
    Alert.alert("알림", "로그아웃 되었습니다.");
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userId");
    dispatch(userSlice.actions.logout());
  };

  return (
    <View className="w-full h-full flex items-center justify-center">
      <Text className="text-teal-500">마이페이지</Text>
      <TouchableOpacity onPress={logout}>
        <Text>임시로그아웃 버튼</Text>
      </TouchableOpacity>
    </View>
  );
}
