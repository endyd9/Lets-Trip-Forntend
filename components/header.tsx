import { Text, View } from "react-native";

export default function Header({ title }) {
  return (
    <View className="flex justify-center w-full ios:h-36 android:h-20  bg-black">
      <Text className="ml-5 ios:mt-12 text-white android:text-3xl ios:text-4xl font-thin">
        Let's Trip
      </Text>
    </View>
  );
}
