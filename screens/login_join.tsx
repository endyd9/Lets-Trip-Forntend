import { useState } from "react";
import {
  Alert,
  Keyboard,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { userSlice } from "../store";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LoginResponse {
  ok: boolean;
  token?: string;
  userId?: number;
  error?: Error;
}

interface PageProps {
  pageChange: Function;
}

const emailVal =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

const Login = ({ pageChange }: PageProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();

  const onLoginTouch = async () => {
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
        if (res.error.message === "가입안된이메일") {
          return Alert.alert("로그인 실패", "이메일을 다시 확인하세요.");
        } else if (res.error.message === "비번틀림") {
          return Alert.alert("로그인 실패", "비밀번호를 다시 확인하세요.");
        } else {
          console.log(res.error.message);
        }
        throw new Error();
      }
      await AsyncStorage.setItem("token", res.token);
      await AsyncStorage.setItem("userId", res.userId + "");
      Alert.alert("로그인", "로그인 되었습니다.");
      dispatch(userSlice.actions.login(res.token));
      dispatch(userSlice.actions.userId(res.userId));
    } catch (error) {
      console.log(error.messga);
      Alert.alert("로그인 실패", "로그인에 실패했습니다");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="w-full h-full flex items-center justify-center bg-gray-200">
        <View className="w-full px-20 gap-3">
          <TextInput
            className="w-full h-10 ios:pb-2 border focus:border-2 border-blue-300 focus:border-blue-500 bg-white rounded-full placeholder:text-xl placeholder:pl-5"
            placeholder="Email"
            placeholderTextColor={"#8b8787"}
            value={email}
            onChange={(
              event: NativeSyntheticEvent<TextInputChangeEventData>
            ) => {
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
          <TouchableOpacity
            className="w-full h-9 border border-blue-400 rounded-full items-center justify-center"
            onPress={() => pageChange()}
          >
            <Text className="text-xl ios:text-2xl text-blue-400 font-semibold">
              Join
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="mt-3"
          onPress={() => Alert.alert("메롱", "미구현이지롱")}
        >
          <Text className="text-blue-400 text-md underline">
            이메일 / 비밀번호 찾기
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const Join = ({ pageChange }: PageProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [Cpassword, setCpassword] = useState<string>("");
  const [nickName, setNickName] = useState<string | undefined>(undefined);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  const onJoinTouch = async () => {
    if (email === "" || password === "" || Cpassword === "") {
      return Alert.alert("알림", "필수 필드를 모두 채워주세요");
    }
    if (!emailVal.test(email)) {
      return Alert.alert("알림", "잘못된 이메일 형식입니다.");
    }
    if (password !== Cpassword) {
      return Alert.alert("알림", "비밀번호가 일치하지 않습니다.");
    }
    setNickName((prev) => (prev === "" ? undefined : prev));
    try {
      const res = await (
        await fetch(`${process.env.EXPO_PUBLIC_BACK_END}/join`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            nickName,
            avatarUrl,
          }),
        })
      ).json();
      if (!res.ok) {
        Alert.alert("회원가입 실패", res.error.message);
        throw new Error(res.error.message);
      }
      Alert.alert("환영합니다", "회원가입이 완료 되었습니다.");
      pageChange();
    } catch (error) {
      console.log(error);
    }
  };

  const avatarUpload = async () => {
    return Alert.alert("는", "미구현");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="w-full h-full flex items-center justify-center bg-gray-200">
        <Text className="text-sm text-blue-500">* 표시는 필수 필드입니다.</Text>
        <View className="w-full px-20 gap-3">
          <TextInput
            className="w-full h-10 ios:pb-2 border focus:border-2 border-blue-300 focus:border-blue-500 bg-white rounded-full placeholder:text-xl placeholder:pl-5"
            placeholder="Email*"
            placeholderTextColor={"#8b8787"}
            value={email}
            onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
              setEmail(event.nativeEvent.text)
            }
          />
          <TextInput
            className="w-full h-10 ios:pb-2 border focus:border-2 border-blue-300 focus:border-blue-500 bg-white rounded-full placeholder:text-xl placeholder:pl-5"
            placeholder="Password*"
            placeholderTextColor={"#8b8787"}
            value={password}
            secureTextEntry
            onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
              setPassword(event.nativeEvent.text)
            }
          />
          <TextInput
            className="w-full h-10 ios:pb-2 border focus:border-2 border-blue-300 focus:border-blue-500 bg-white rounded-full placeholder:text-xl placeholder:pl-5"
            placeholder="Password Check*"
            placeholderTextColor={"#8b8787"}
            value={Cpassword}
            secureTextEntry
            onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
              setCpassword(event.nativeEvent.text)
            }
          />
          <TextInput
            className="w-full h-10 ios:pb-2 border focus:border-2 border-blue-300 focus:border-blue-500 bg-white rounded-full placeholder:text-xl placeholder:pl-5"
            placeholder="NickName"
            placeholderTextColor={"#8b8787"}
            value={nickName}
            onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
              setNickName(event.nativeEvent.text)
            }
          />
          <TouchableOpacity
            className="w-full h-9 border border-blue-400 rounded-full items-center justify-center"
            onPress={avatarUpload}
          >
            <Text className="text-xl ios:text-2xl text-blue-400 font-semibold">
              프로필 사진
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-full h-9 bg-blue-400 rounded-full items-center justify-center"
            onPress={onJoinTouch}
          >
            <Text className="text-xl ios:text-2xl text-white font-semibold">
              Join
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="mt-3" onPress={() => pageChange()}>
          <Text className="text-blue-400 text-md underline">
            로그인 페이지로 돌아가기
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default function LoginAndJoin() {
  const [isLoginPage, setIsLoginPage] = useState<boolean>(true);
  const pageChange = () => {
    return setIsLoginPage((prev) => !prev);
  };
  return isLoginPage ? (
    <Login pageChange={pageChange} />
  ) : (
    <Join pageChange={pageChange} />
  );
}
