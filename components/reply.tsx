import { View, Text } from "react-native";
import { CommentData, IReply } from "../screens/board/posts/detail/screen";

interface ReplyProps {
  reply: IReply;
}

const Reply: React.FC<ReplyProps> = ({ reply }) => {
  return (
    <View className="flex-row justify-between pt-3 px-10">
      <Text> L {reply.content}</Text>
      {reply.writer ? (
        <Text>{reply.writer.nickName}</Text>
      ) : (
        <Text>{reply.nomem}</Text>
      )}
    </View>
  );
};

export default Reply;
