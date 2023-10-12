import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

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

type sortOption =
  | "createdAtDESC"
  | "createdAtASC"
  | "title"
  | "writer"
  | "view"
  | "like";

export default function Posts({ navigation, route }) {
  const [data, setData] = useState<BoardData>();
  const [loading, setLoading] = useState<boolean>(true);
  const { boardId } = route.params;

  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<sortOption>("createdAtDESC");
  const [limit, setLimit] = useState<number>(10);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "최신순", value: "createdAtDESC" },
    { label: "오래된순", value: "createdAtASC" },
    { label: "제목순", value: "title" },
    { label: "작성자순", value: "writer" },
    { label: "조회수순", value: "view" },
    { label: "좋아요순", value: "like" },
  ]);

  const getData = async () => {
    try {
      const res: BoardData = await (
        await fetch(
          `http://192.168.45.17:4000/boards/${boardId}?page=${page}&sort=${sort}`
        )
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
  }, [sort]);

  return (
    <View className="w-full h-full bg-gray-200">
      <View className="mt-5">
        <View className="flex-row justify-between mx-5">
          <Text className="text-xl ios:text-2xl">게시글 목록</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("postWrite", { boardId })}
          >
            <Text className="text-3xl ios:text-4xl text-blue-500">+</Text>
          </TouchableOpacity>
        </View>

        <View className=" mx-5 px-5 pb-5 h-[90%] border rounded-lg">
          <View className="flex-row py-3 z-0">
            <DropDownPicker
              open={open}
              value={sort}
              items={items}
              setOpen={setOpen}
              setValue={setSort}
              setItems={setItems}
              style={{
                width: 110,
                height: 50,
              }}
            />
          </View>
          {!loading ? (
            <ScrollView className="-z-10">
              {data.posts.map((post, index) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("post", {
                      postId: post.id,
                    })
                  }
                  key={post.id}
                  className={
                    index !== data.posts.length - 1
                      ? "flex-row w-full h-10 border-t items-center justify-between px-3"
                      : "flex-row w-full h-10 border-t border-b items-center justify-between px-3"
                  }
                >
                  <View className="w-[70%] border-r">
                    <Text className="ios:text-xl">{post.title}</Text>
                  </View>
                  <View className="w-[35%] items-center">
                    <Text className="ios:text-xl">{post.nickName}</Text>
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
    </View>
  );
}
