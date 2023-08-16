import { StyleSheet, Text, View } from "react-native";

export function PostsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Page PostsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: `#8a2be2`,
    fontFamily: "Roboto-700",
    fontSize: 20,
    color: "#9370db",
  },
});
