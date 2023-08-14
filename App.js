import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { RegistrationScreen } from './Screns/RegistrationScreen';
import { LoginScreen } from './Screns/LoginScreen';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-700': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-400': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-500': require('./assets/fonts/Roboto-Medium.ttf'),
  });
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <RegistrationScreen />  
       {/* <LoginScreen /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  bgimage: {
    flex:1,
    resizeMode: "cover",
    justifyContent: "center",
  }
});
