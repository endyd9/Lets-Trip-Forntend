import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";

interface PostData {
  boardId: number;
  createdAt: string;
  id: number;
  title: string;
  imgUrl: string;
  view: number;
  writer: {
    id: number;
    nickName: string;
    avatarUrl: string;
  };
  nomem: string;
  password: string;
  content: string;
  searchName: string;
}

export default function Post({ route }) {
  const { postId } = route.params;
  const [postData, setPostData] = useState<PostData>();
  const [loading, setLoading] = useState<boolean>(true);

  const [commentData, setCommentData] = useState();

  const { isLoggedin, userId } = useSelector((state: any) => state.users.value);
  const [isMy, setIsMy] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const [usersPost, setUsersPost] = useState<boolean>(false);

  const getData = async () => {
    try {
      const res = await (
        await fetch(`${process.env.EXPO_PUBLIC_BACK_END}/posts/${postId}`)
      ).json();
      setPostData(res.post);
      if (res.post.writer) {
        setUsersPost(true);
        if (res.post.writer.id === userId) {
          setIsMy(true);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      getCommentData();
    }
  };

  const getCommentData = async () => {
    try {
      const res = await (
        await fetch(
          `${process.env.EXPO_PUBLIC_BACK_END}/posts/${postId}/comments`
        )
      ).json();
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <ScrollView className="w-full h-full bg-gray-200">
      {loading ? (
        <Text>로딩중임둥</Text>
      ) : (
        <View className="mt-5 mx-5">
          {!usersPost && !isLoggedin && (
            <View className="w-full flex-row justify-between pb-5 border-b-2">
              <TextInput
                className="border h-10 w-[50%] rounded-md pl-1 mb-3 my-auto"
                placeholder="Password"
                placeholderTextColor={"#8b8787"}
                secureTextEntry
                // value={password}
                // onChange={(
                //   event: NativeSyntheticEvent<TextInputChangeEventData>
                // ) => setPassword(event.nativeEvent.text)}
              />
              <TouchableOpacity className="w-[20%] items-center justify-center bg-blue-400 rounded-xl py-2">
                <Text className="text-lg text-white font-bold">수정 ✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity className="w-[20%] items-center justify-center bg-red-400 rounded-xl py-2">
                <Text className="text-lg text-white font-bold">삭제 ❌</Text>
              </TouchableOpacity>
            </View>
          )}
          <View className="flex-row justify-between py-2 border-b-2">
            <Text className="text-xl ios:text-2xl">{postData.title}</Text>
            {isMy && (
              <View className="flex-row justify-between w-[45%]">
                <TouchableOpacity className="items-center justify-center bg-blue-400 rounded-xl py-2 px-3">
                  <Text className="text-lg text-white font-bold">수정 ✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center justify-center bg-red-400 rounded-xl py-2 px-3">
                  <Text className="text-lg text-white font-bold">삭제 ❌</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View className="flex-row justify-between py-1 mx-3">
            <View>
              <Text>작성자 : {postData.searchName}</Text>
              <Text>작성일자 : {postData.createdAt}</Text>
              <Text>조회수 : {postData.view} 회</Text>
            </View>
            <TouchableOpacity>
              <Text className="text-4xl text-red-600 my-auto">
                {isLiked ? "♥" : "♡"}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="border-t-2 pt-3">
            <Text>{postData.content}</Text>
          </View>
          <View>
            <Text>댓글창 만들자</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
