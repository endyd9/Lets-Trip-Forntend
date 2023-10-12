import { NavigationContainer } from "@react-navigation/native";
import Post from "./screens/board/posts/detail/screen";
import Posts from "./screens/board/posts/screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { useSelector } from "react-redux";
import * as solidIcons from "react-native-heroicons/solid";
import * as outlineIcons from "react-native-heroicons/outline";
import Board from "./screens/board/screen";
import Home from "./screens/home";
import My from "./screens/my-page";
import Search from "./screens/search";
import Top from "./screens/top";
import Header from "./components/header";
import LoginAndJoin from "./screens/login_join";
import WritePost from "./screens/board/posts/write";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNav = () => {
  const { isLoggedin } = useSelector((state: any) => state.users.value);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          switch (route.name) {
            case "Home":
              return focused ? (
                <solidIcons.HomeIcon size={size} color={color} />
              ) : (
                <outlineIcons.HomeIcon size={size} color={"black"} />
              );
            case "Board":
              return focused ? (
                <solidIcons.ListBulletIcon size={size} color={color} />
              ) : (
                <outlineIcons.ListBulletIcon size={size} color={"black"} />
              );
            case "Top":
              return focused ? (
                <solidIcons.TrophyIcon size={size} color={color} />
              ) : (
                <outlineIcons.TrophyIcon size={size} color={"black"} />
              );
            case "Search":
              return focused ? (
                <solidIcons.MagnifyingGlassIcon size={size} color={color} />
              ) : (
                <outlineIcons.MagnifyingGlassIcon size={size} color={"black"} />
              );
            case "My":
              return focused ? (
                <solidIcons.UserIcon size={size} color={color} />
              ) : (
                <outlineIcons.UserIcon size={size} color={"black"} />
              );
          }
        },
        headerShown: false,
        tabBarLabel: () => null,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Board" component={Board} />
      <Tab.Screen name="Top" component={Top} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="My" component={isLoggedin ? My : LoginAndJoin} />
    </Tab.Navigator>
  );
};

export default function Navigator() {
  const [title, setTitle] = useState("Home");
  return (
    <NavigationContainer>
      <Header title={title} />
      <Stack.Navigator
        initialRouteName="Tabs"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Tabs" component={TabNav} />
        <Stack.Screen name="posts" component={Posts} />
        <Stack.Screen name="post" component={Post} />
        <Stack.Screen name="postWrite" component={WritePost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
