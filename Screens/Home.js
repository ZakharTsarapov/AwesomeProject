import { Button, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { PostsScreen } from "./PostsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";
import { TouchableOpacity } from "react-native-gesture-handler";

export function Home() {
  const Tabs = createBottomTabNavigator();
  const navigation = useNavigation();

  const optionPosts = {
    title: "Публікації",
    headerRight: () => {
      return (
        <TouchableOpacity
          style={{ marginRight: 10 }}
          activeOpacity={0.3}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      );
    },
    tabBarIcon: ({ focused, size, color }) => (
      <Feather
        style={{ alignSelf: "flex-end", marginRight: 39 }}
        name="grid"
        size={24}
        color={focused ? "#212121" : color}
      />
    ),
  };

  const optionsCreatePosts = {
    title: "Створити публікацію",
    tabBarIcon: ({ focused, size, color }) => (
      <TouchableOpacity
        style={{ ...styles.btn, width: focused ? 80 : 70 }}
        activeOpacity={0.8}
        onPress={() => console.log("tabBarIcon")}
      >
        <Feather name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    ),
  };

  const optionsProfile = {
    headerShown: false,
    tabBarIcon: ({ focused, size, color }) => (
      <Feather
        style={{ alignSelf: "flex-start", marginLeft: 39 }}
        name="user"
        size={24}
        color={focused ? "#212121" : color}
      />
    ),
  };

  return (
    <Tabs.Navigator
      screenOptions={{ tabBarShowLabel: false }}
      initialRouteName="Posts"
    >
      <Tabs.Screen name="Posts" component={PostsScreen} options={optionPosts} />
      <Tabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={optionsCreatePosts}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={optionsProfile}
      />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    height: 40,
    borderRadius: 100,
  },
});
