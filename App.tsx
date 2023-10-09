import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/home";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import * as solidIcons from "react-native-heroicons/solid";
import * as outlineIcons from "react-native-heroicons/outline";
import Board from "./screens/board/screen";
import Top from "./screens/top";
import Search from "./screens/search";
import Login from "./screens/login";
import My from "./screens/my-page";
import Header from "./components/header";
import { useState } from "react";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const isLoggdin = true;

export default function App() {
  const [title, setTitle] = useState("Home");
  return (
    <>
      <Header title={title} />
      <NavigationContainer>
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
                    <outlineIcons.MagnifyingGlassIcon
                      size={size}
                      color={"black"}
                    />
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
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Board" component={Board} />
          <Tab.Screen name="Top" component={Top} />
          <Tab.Screen name="Search" component={Search} />
          <Tab.Screen name="My" component={isLoggdin ? My : Login} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
