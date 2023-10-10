import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface BoardData {
  ok: boolean;
  posts: [
    {
      id: number;
      createdAt: string;
      title: string;
      view: number;
      nickName: string;
    }
  ];
}

export default function Posts({ navigation, route }) {
  const [data, setData] = useState<BoardData>();
  const [loading, setLoading] = useState<boolean>(true);
  const { boardId } = route.params;

  const getData = async () => {
    try {
      const res: BoardData = await (
        await fetch(`http://192.168.45.17:4000/boards/${boardId}`)
      ).json();
      setData({ ...res });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(() => false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View className="w-full h-full">
      <View className="mt-10">
        <View className="flex-row justify-between mx-5">
          <Text className="text-xl ios:text-2xl">게시글 목록</Text>
          <TouchableOpacity
            onPress={() => Alert.alert("알림", "요로케 쓰는구만")}
          >
            <Text className="text-3xl ios:text-4xl text-blue-500">+</Text>
          </TouchableOpacity>
        </View>
        {!loading ? (
          <ScrollView className="mx-5 px-5 py-5 h-[90%] border rounded-lg">
            {data.posts.map((board, index) => (
              <TouchableOpacity
                key={board.id}
                className={
                  index !== data.posts.length - 1
                    ? "flex-row w-full h-10 border-t items-center justify-between px-3"
                    : "flex-row w-full h-10 border-t border-b items-center justify-between px-3"
                }
              >
                <View className="w-[70%] border-r">
                  <Text className="ios:text-xl">{board.title}</Text>
                </View>
                <View className="w-[35%] items-center">
                  <Text className="ios:text-xl">{board.nickName}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <Text className="text-xl w-full h-full text-center mt-[50%]">
            Loading...
          </Text>
        )}
      </View>
    </View>
  );
}
