import { useState } from "react";
import {
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";

interface WriteCommentProps {
  isLoggedIn: boolean;
}

export default function WriteComment({ isLoggedIn }: WriteCommentProps) {
  const [nickName, setNickName] = useState<string>("");
  const [commentPass, setCommentPass] = useState<string>("");
  return (
    !isLoggedIn && (
      <View className="flex-row justify-between">
        <TextInput
          className="border h-10 w-[49%] rounded-md pl-1 mb-3"
          placeholder="nickName"
          placeholderTextColor={"#8b8787"}
          value={nickName}
          onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
            setNickName(event.nativeEvent.text)
          }
        />
        <TextInput
          className="border h-10 w-[49%] rounded-md pl-1 mb-3"
          placeholder="Password"
          placeholderTextColor={"#8b8787"}
          secureTextEntry
          value={commentPass}
          onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
            setCommentPass(event.nativeEvent.text)
          }
        />
      </View>
    )
  );
}
