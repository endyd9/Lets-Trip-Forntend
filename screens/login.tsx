import { useState } from "react";
import {
  Alert,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { userSlice } from "../store";

interface LoginResponse {
  ok: true;
  token: string;
}

export default function Login({ navigation }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();

  const onLoginTouch = async () => {
    const emailVal =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (email === "") {
      return Alert.alert("로그인 실패", "이메일을 입력하세요");
    } else if (!emailVal.test(email)) {
      return Alert.alert("로그인 실패", "잘못된 이메일 형식입니다.");
    } else if (password === "") {
      return Alert.alert("로그인 실패", "비밀번호를 입력하세요");
    }
    try {
      const res: LoginResponse = await (
        await fetch(`${process.env.EXPO_PUBLIC_BACK_END}/login`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })
      ).json();
      if (!res.ok) {
        throw new Error();
      }
      dispatch(userSlice.actions.login(res.token));
    } catch (error) {
      console.log(error);
      Alert.alert("로그인 실패", "로그인에 실패했습니다");
    }
  };

  return (
    <View className="w-full h-full flex items-center justify-center bg-gray-200">
      <View className="w-full px-20 gap-3">
        <TextInput
          className="w-full h-10 ios:pb-2 border focus:border-2 border-blue-300 focus:border-blue-500 bg-white rounded-full placeholder:text-xl placeholder:pl-5"
          placeholder="Email"
          placeholderTextColor={"#8b8787"}
          value={email}
          onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) => {
            setEmail(event.nativeEvent.text);
          }}
        />
        <TextInput
          className="w-full h-10 ios:pb-2 border focus:border-2 border-blue-300 focus:border-blue-500 bg-white rounded-full placeholder:text-xl placeholder:pl-5"
          placeholder="PassWord"
          placeholderTextColor={"#8b8787"}
          secureTextEntry
          value={password}
          onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
            setPassword(event.nativeEvent.text)
          }
        />
        <TouchableOpacity
          className="w-full h-9 bg-blue-400 rounded-full items-center justify-center"
          onPress={onLoginTouch}
        >
          <Text className="text-xl ios:text-2xl text-white font-semibold">
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-full h-9 border border-blue-400 rounded-full items-center justify-center">
          <Text className="text-xl ios:text-2xl text-blue-400 font-semibold">
            Join
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity className="mt-3">
        <Text className="text-blue-400 text-md underline">
          이메일 / 비밀번호 찾기
        </Text>
      </TouchableOpacity>
    </View>
  );
}
