import { View, Text, TouchableOpacity, Alert } from "react-native";
import { CommentData } from "../screens/board/posts/detail/screen";
import { useSelector } from "react-redux";
import Reply from "./reply";
import { useEffect, useState } from "react";

interface CommentProps {
  comment: CommentData;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isReplyMode, setIsReplyMode] = useState<boolean>(false);
  const { isLoggedIn, userId, token } = useSelector(
    (state: any) => state.users.value
  );

  const onEditPress = () => {};

  const onDeletePress = async () => {
    const { ok, error } = await (
      await fetch(
        `${process.env.EXPO_PUBLIC_BACK_END}/comments/${comment.id}`,
        {
          method: "delete",
          headers: {
            "Contents-Types": "Application/json",
            token: token.payload,
          },
        }
      )
    ).json();
  };

  const onCommentPress = () => {
    setIsReplyMode((prev) => !prev);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      if (comment.nomem) {
        return setIsOwner(() => true);
      }
    }
    if (comment.writer.id === userId.payload) {
      return setIsOwner(() => true);
    }
  }, []);
  return (
    <View className="border-t">
      <TouchableOpacity
        className="flex-row justify-between mt-2 mb-4 pt-3 px-5"
        onPress={onCommentPress}
      >
        <Text className="">
          {comment.content}
          {isOwner ? (
            <View className="flex-row justify-center my-0 py-0 ml-5">
              <TouchableOpacity className="mr-2" onPress={onEditPress}>
                <Text className="text-blue-500">수정</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onDeletePress}>
                <Text className="text-red-500">삭제</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </Text>
        {comment.writer ? (
          <Text>{comment.writer.nickName}</Text>
        ) : (
          <Text>{comment.nomem}</Text>
        )}
      </TouchableOpacity>
      {comment.reply
        ? comment.reply.map((reply) => (
            <Reply key={`${comment.id}/${reply.id}`} reply={reply} />
          ))
        : null}
      {isReplyMode && <Text>1</Text>}
    </View>
  );
};

export default Comment;
