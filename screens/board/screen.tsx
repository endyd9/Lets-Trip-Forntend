import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface BoardsData {
  ok: boolean;
  boards: [
    {
      id: number;
      name: string;
      // posts: number; 나중에 추가
    }
  ];
}

export default function Board({ navigation }) {
  const [data, setData] = useState<BoardsData>();
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    try {
      const res: BoardsData = await (
        await fetch("http://192.168.45.17:4000/boards")
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
    <View className="w-full h-full bg-gray-200">
      <View className="mt-5">
        <View className="flex-row justify-between mx-5">
          <Text className="text-xl ios:text-2xl">게시판 목록</Text>
          <TouchableOpacity
            onPress={() => Alert.alert("게시판 등록", "아직은 쓸 수 없다")}
          >
            <Text className="text-3xl ios:text-4xl text-blue-500">+</Text>
          </TouchableOpacity>
        </View>
        {!loading ? (
          <ScrollView className="mx-5 px-5 py-5 h-[90%] border rounded-lg">
            {data.boards.map((board, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(`posts`, {
                    boardId: board.id,
                  })
                }
                key={board.id}
                className={
                  index !== data.boards.length - 1
                    ? "w-full h-10 border-t items-end justify-center"
                    : "w-full h-10 border-t border-b items-end justify-center"
                }
              >
                <Text className="text-lg ios:text-xl mr-3 ">{board.name}</Text>
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
