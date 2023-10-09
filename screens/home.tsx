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
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    try {
      const res: HomeDataResponse = await (
        await fetch("http://192.168.45.17:4000/")
      ).json();
      setData({ ...res });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(() => true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View className="w-full h-full flex flex-cols items-center bg-gray-400">
      {loading ? (
        <>
          <View className="mt-20 w-full ios:mb-20 android:mb-16 android:h-2/5 ios:h-2/5 bg-gray-300 flex-row">
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
                <Image
                  key={post.id}
                  className="w-full h-full"
                  source={{
                    uri: post.imgUrl,
                  }}
                  resizeMode="cover"
                />
              ))}
            </Swiper>
          </View>
          <View className="w-[90%] py-5 border-2">
            {data?.newest?.map((post) => (
              <TouchableOpacity
                onPress={() => navigation.push("Board")}
                key={post.id}
                className="flex flex-row justify-between my-1 mx-3"
              >
                <Text className="ios:text-xl">{post.title}</Text>
                <Text className="ios:text-xl">{post.nickName}</Text>
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
