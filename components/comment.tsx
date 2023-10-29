import { View, Text, TouchableOpacity } from "react-native";
import { CommentData } from "../screens/board/posts/detail/screen";
import { useSelector } from "react-redux";
import Reply from "./reply";

interface CommentProps {
  comment: CommentData;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const { isLoggedIn, userId, token } = useSelector(
    (state: any) => state.users.value
  );

  return (
    <View className="border-t">
      <TouchableOpacity className="flex-row justify-between my-2 pt-3 px-5">
        <Text>{comment.content}</Text>
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
    </View>
  );
};

export default Comment;
