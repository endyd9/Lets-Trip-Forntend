import { useState } from "react";
import {
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableOpacity,
  Text,
} from "react-native";
import { useSelector } from "react-redux";

interface WriteCommentProps {
  postId: number;
  setNewComment: Function;
}

interface WriteCommentData {
  nomem?: string;
  password?: string;
  content: string;
}

export default function WriteComment({
  postId,
  setNewComment,
}: WriteCommentProps) {
  const [nickName, setNickName] = useState<string>("");
  const [commentPass, setCommentPass] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const { isLoggedIn, token } = useSelector((state: any) => state.users.value);

  const onPressAddComment = async () => {
    let commentData: WriteCommentData = {
      content: comment,
    };
    if (!isLoggedIn) {
      commentData.nomem = nickName;
      commentData.password = commentPass;
    }
    try {
      const { ok, error, newComment } = await (
        await fetch(`${process.env.EXPO_PUBLIC_BACK_END}/comments/${postId}`, {
          method: "post",
          headers: {
            "Content-type": "Application/json",
            token: token.payload,
          },
          body: JSON.stringify(commentData),
        })
      ).json();
      if (!ok) {
        throw new Error(error);
      }
      setNewComment(newComment);
    } catch (error) {
      console.log(error);
    } finally {
      setComment("");
    }
  };

  return !isLoggedIn ? (
    <>
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
      <View className="flex-row justify-between mb-2">
        <TextInput
          className="w-[70%] border rounded-lg h-12"
          placeholder="댓글"
          multiline
          value={comment}
          onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
            setComment(event.nativeEvent.text)
          }
        />
        <TouchableOpacity
          className="w-[25%] items-center justify-center border border-blue-400 rounded-xl"
          onPress={onPressAddComment}
        >
          <Text className="text-blue-400 font-bold">댓글달기</Text>
        </TouchableOpacity>
      </View>
    </>
  ) : (
    <>
      <View className="flex-row justify-between mb-2">
        <TextInput
          className="w-[70%] border rounded-lg h-12"
          placeholder="댓글"
          multiline
          value={comment}
          onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
            setComment(event.nativeEvent.text)
          }
        />
        <TouchableOpacity
          className="w-[25%] items-center justify-center border border-blue-400 rounded-xl"
          onPress={onPressAddComment}
        >
          <Text className="text-blue-400 font-bold">댓글달기</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
