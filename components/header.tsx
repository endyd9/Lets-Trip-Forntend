import { SafeAreaView, Text, View } from "react-native";

export default function Header({ title }) {
  return (
    <SafeAreaView className="flex justify-center w-full bg-black">
      <Text className="ml-5 my-3 text-white android:text-3xl ios:text-4xl font-thin ">
        Let's Trip
      </Text>
    </SafeAreaView>
  );
}
