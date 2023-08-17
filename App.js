import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { Navigation } from "./Components/Navigation.js";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-700": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-400": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-500": require("./assets/fonts/Roboto-Medium.ttf"),
  });
  if (!fontsLoaded) return null;

  return (
    <NavigationContainer style={styles.container}>
      <Navigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
