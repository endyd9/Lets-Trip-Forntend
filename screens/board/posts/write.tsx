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
import { useSelector } from "react-redux";

export default function WritePost({ navigation, route }) {
  const { isLoggedin, token } = useSelector((state: any) => state.users.value);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string>("");

  const onSaveTouch = async () => {
    if (title === "") {
      return Alert.alert("알림", "제목을 입력하세요.");
    } else if (content === "") {
      return Alert.alert("알림", "내용을 입력하세요.");
    }
    try {
      if (isLoggedin) {
        const res = await (
          await fetch(
            `${process.env.EXPO_PUBLIC_BACK_END}/boards/${route.params.boardId}`,
            {
              method: "post",
              headers: {
                "Content-type": "Application/json",
                token: token.payload,
              },
              body: JSON.stringify({
                title,
                content,
              }),
            }
          )
        ).json();
        if (!res.ok) {
          throw new Error();
        }
        Alert.alert("알림", "업로드 완료");
        navigation.navigate("post", {
          postId: res.postId,
        });
      } else {
        const res = await (
          await fetch(
            `${process.env.EXPO_PUBLIC_BACK_END}/boards/${route.params.boardId}`,
            {
              method: "post",
              headers: {
                "Content-type": "Application/json",
                token,
              },
              body: JSON.stringify({
                nomem: nickName,
                password,
                title,
                content,
              }),
            }
          )
        ).json();

        if (!res.ok) {
          throw new Error();
        }
        Alert.alert("알림", "업로드 완료");
        navigation.navigate("post", {
          postId: res.postId,
        });
      }
    } catch (error) {
      Alert.alert("알림", "업로드 실패!");
      console.log(error);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="w-full h-full">
        <View className="mt-5">
          <View className="flex-row justify-between mx-5 mb-5">
            <Text className="text-xl ios:text-2xl">게시글 작성</Text>
          </View>
          <View className="mx-5 px-5 py-3 h-[90%] border rounded-lg">
            {!isLoggedin && (
              <View className="flex-row justify-between border-b-2 mb-3">
                <TextInput
                  className="border h-10 w-[45%] rounded-md pl-1 mb-3"
                  placeholder="nickName"
                  placeholderTextColor={"#8b8787"}
                  lineBreakStrategyIOS="hangul-word"
                  value={nickName}
                  onChange={(
                    event: NativeSyntheticEvent<TextInputChangeEventData>
                  ) => setNickName(event.nativeEvent.text)}
                />
                <TextInput
                  className="border h-10 w-[45%] rounded-md pl-1 mb-3"
                  placeholder="Password"
                  placeholderTextColor={"#8b8787"}
                  secureTextEntry
                  value={password}
                  onChange={(
                    event: NativeSyntheticEvent<TextInputChangeEventData>
                  ) => setPassword(event.nativeEvent.text)}
                />
              </View>
            )}
            <TextInput
              className="border h-10 rounded-md placeholder:pl-3"
              placeholder="제목을 입력하세요."
              placeholderTextColor={"#8b8787"}
              maxLength={200}
              value={title}
              onChange={(
                event: NativeSyntheticEvent<TextInputChangeEventData>
              ) => setTitle(event.nativeEvent.text)}
            />
            <TouchableOpacity className="h-8 ios:h-10 mt-3 border border-blue-400 rounded-md items-center justify-center">
              <Text className="text-blue-400 ios:text-xl">
                이미지 업로드 🏞️
              </Text>
            </TouchableOpacity>
            <TextInput
              className="border h-auto ios:h-[55%] rounded-md mt-3 p-1"
              style={{ textAlignVertical: "top" }}
              placeholder="내용을 입력하세요."
              placeholderTextColor={"#8b8787"}
              multiline
              numberOfLines={15}
              value={content}
              onChange={(
                event: NativeSyntheticEvent<TextInputChangeEventData>
              ) => setContent(event.nativeEvent.text)}
            />
            <TouchableOpacity
              className="h-8 ios:h-10 mt-3 rounded-md bg-blue-400 items-center justify-center"
              onPress={onSaveTouch}
            >
              <Text className="text-white ios:text-xl">저장</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="h-8 ios:h-10 mt-3 rounded-md bg-red-400 items-center justify-center"
              onPress={() => navigation.goBack()}
            >
              <Text className="text-white ios:text-xl">취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
