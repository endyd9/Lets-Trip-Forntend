import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Text, View, Image, Button, TouchableOpacity } from "react-native";
import Swiper from "react-native-web-swiper";

interface HomeDataResponse {
  ok: boolean;
  mostLiked?: [
    {
      createdAt: Date;
      id: number;
      imgUrl: string;
    }
  ];
  newest: [
    {
      createdAt: Date;
      id: number;
      title: string;
      nickName: string;
    }
  ];
}

export default function Home({ navigation }) {
  const [data, setData] = useState<HomeDataResponse>();
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    try {
      const res: HomeDataResponse = await (
        await fetch("http://192.168.45.17:4000/")
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
    <View className="w-full h-full flex flex-cols items-center bg-gray-200">
      {!loading ? (
        <>
          <View className="mt-16 w-full ios:mb-20 android:mb-16 android:h-2/5 ios:h-2/5 bg-gray-300 flex-row">
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
              {data.mostLiked.map((post) => (
                <TouchableOpacity
                  onPress={() => console.log(post.id)}
                  key={post.id}
                >
                  <Image
                    className="w-full h-full"
                    source={{
                      uri: post.imgUrl,
                    }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
            </Swiper>
          </View>
          <Text className="text-2xl android:text-xl mb-3 mr-64">
            최근 게시글
          </Text>
          <View className="w-[90%] border-2 my-3 rounded-md">
            {data?.newest?.map((post) => (
              <TouchableOpacity
                onPress={() => console.log(post.id)}
                key={post.id}
                className="flex-row w-full border-b py-3"
              >
                <View className="w-[70%] px-3 border-r h-full">
                  <Text className="ios:text-xl">{post.title}</Text>
                </View>
                <View className="w-[30%] items-center">
                  <Text className="ios:text-xl">{post.nickName}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

// <View className="w-[90%]">
//             {data?.newest?.map((post, index) => (
//               <TouchableOpacity
//                 onPress={() => console.log(post.id)}
//                 key={post.id}
//                 className={
//                   index === 0
//                     ? "flex-row justify-between px-5 py-1 border-2"
//                     : index === data.newest.length - 1
//                     ? "flex-row justify-between px-5 py-1 border-2"
//                     : "flex-row justify-between px-5 py-1 border-l-2 border-r-2"
//                 }
//               >
//                 <Text className="ios:text-xl">{post.title}</Text>
//                 <Text className="ios:text-xl">{post.nickName}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
