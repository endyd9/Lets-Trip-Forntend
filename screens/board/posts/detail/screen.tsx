import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { useSelector } from "react-redux";
import WriteComment from "../../../../components/writeComment";
import Swiper from "react-native-web-swiper";

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

export interface CommentData {
  id: number;
  createdAt: string;
  content: string;
  reply?: [
    {
      id: number;
      content: string;
      writer?: {
        id: number;
        nickName: string;
        avatarUrl: string;
      };
      nomem?: string;
      password?: string;
    }
  ];
  writer?: {
    id: number;
    avatarUrl: string;
    nickName: string;
  };
  nomem?: string;
  password: string;
}

export default function Post({ route }) {
  const { postId } = route.params;
  const [postData, setPostData] = useState<PostData>();
  const [loading, setLoading] = useState<boolean>(true);

  const [commentData, setCommentData] = useState<CommentData[]>();

  const { isLoggedIn, userId, token } = useSelector(
    (state: any) => state.users.value
  );
  const [isMy, setIsMy] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const [usersPost, setUsersPost] = useState<boolean>(false);

  const [postPass, setPostPass] = useState<string>("");

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
      setCommentData(res.comments);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const setNewComment = (newComment: CommentData) => {
    setCommentData([newComment, ...commentData]);
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
          {!usersPost && !isLoggedIn && (
            <View className="w-full flex-row justify-between pb-5 border-b-2">
              <TextInput
                className="border h-10 w-[50%] rounded-md pl-1 mb-3 my-auto"
                placeholder="Password"
                placeholderTextColor={"#8b8787"}
                secureTextEntry
                value={postPass}
                onChange={(
                  event: NativeSyntheticEvent<TextInputChangeEventData>
                ) => setPostPass(event.nativeEvent.text)}
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

          {postData.imgUrl ? (
            <View className="w-full h-64 border-t-2 py-5">
              <Swiper
                loop={true}
                timeout={5}
                controlsProps={{
                  prevTitle: "<",
                  nextTitle: ">",
                  dotsTouchable: true,
                  dotsPos: "bottom",
                  prevPos: false,
                  nextPos: false,
                  nextTitleStyle: {
                    color: "white",
                    backgroundColor: "black",
                    fontSize: 30,
                    width: 30,
                    height: 30,
                    textAlign: "center",
                    borderRadius: 100,
                    lineHeight: 32,
                    overflow: "hidden",
                  },
                  prevTitleStyle: {
                    color: "white",
                    backgroundColor: "black",
                    fontSize: 30,
                    width: 30,
                    height: 30,
                    textAlign: "center",
                    borderRadius: 100,
                    borderBottomLeftRadius: 100,
                    lineHeight: 32,
                    overflow: "hidden",
                  },
                }}
              >
                <Image
                  className="w-full h-full"
                  source={{
                    uri: postData.imgUrl,
                  }}
                  resizeMode="cover"
                />
              </Swiper>
            </View>
          ) : null}

          <View className="border-t-2 border-b-2 py-10">
            <Text>{postData.content}</Text>
          </View>
          <View className="pb-10">
            <Text className="text-xl my-3">댓글({commentData.length})</Text>
            <WriteComment
              isLoggedIn={isLoggedIn}
              postId={postId}
              token={token}
              setNewComment={setNewComment}
            />

            {commentData.length > 0 ? (
              commentData.map((comment) => (
                <View key={comment.id}>
                  <View className="flex-row justify-between my-2 border-t pt-3 px-5">
                    <Text>{comment.content}</Text>
                    {comment.writer ? (
                      <Text>{comment.writer.nickName}</Text>
                    ) : (
                      <Text>{comment.nomem}</Text>
                    )}
                  </View>
                  {comment.reply
                    ? comment.reply.map((reply) => (
                        <View
                          key={`${comment.id}/${reply.id}`}
                          className="flex-row justify-between pt-3 px-10"
                        >
                          <Text> L {reply.content}</Text>
                          {reply.writer ? (
                            <Text>{reply.writer.nickName}</Text>
                          ) : (
                            <Text>{reply.nomem}</Text>
                          )}
                        </View>
                      ))
                    : null}
                </View>
              ))
            ) : (
              <Text className="text-center text-lg border-t pt-16 mt-2">
                댓글이 없습니다.
              </Text>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
}
