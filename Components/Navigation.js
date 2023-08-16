import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationScreen } from "../Screens/RegistrationScreen";
import { LoginScreen } from "../Screens/LoginScreen";
import { CommentsScreen } from "../Screens/CommentsScreen";
import { MapScreen } from "../Screens/MapScreen";
import { Home } from "../Screens/Home";
import { Button } from "react-native";

export function Navigation() {
  const MainStack = createStackNavigator();

  const optionsHome = {
    headerShown: false,
    title: "Home page",
    headerStyle: { backgroundColor: `#f5f5dc` },
    headerTintColor: "green",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 20,
      color: "#ff8c00",
    },
    headerRight: () => {
      return (
        <Button
          onPress={() => console.log("click Button")}
          title="Press me"
          color="black"
        />
      );
    },
  };

  return (
    <>
      <MainStack.Navigator initialRouteName="LoginScreen">
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />

        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <MainStack.Screen name="Home" component={Home} options={optionsHome} />

        <MainStack.Screen
          name="Comments"
          component={CommentsScreen}
          options={{ headerShown: true }}
        />
        <MainStack.Screen
          name="Map"
          component={MapScreen}
          options={{ headerShown: true }}
        />
      </MainStack.Navigator>
    </>
  );
}
