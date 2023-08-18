import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { PostsScreen } from '../Screens/PostsScreen';
import { CreatePostsScreen } from '../Screens/CreatePostsScreen';
import { ProfileScreen } from '../Screens/ProfileScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { BtnLogout } from '../helpers/BtnLogout';

export function Home() {
  const Tabs = createBottomTabNavigator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const optionPosts = {
    title: 'Публікації',
    headerRight: () => <BtnLogout styleProp={{ marginRight: 10 }} />,
    tabBarIcon: ({ focused, size, color }) => (
      <Feather
        style={{ alignSelf: 'flex-end', marginRight: 39 }}
        name="grid"
        size={24}
        color={focused ? '#212121' : color}
      />
    ),
  };

  const optionsCreatePosts = {
    title: 'Створити публікацію',
    tabBarStyle: { display: 'none' },

    tabBarIcon: ({ focused, size, color }) => (
      <TouchableOpacity
        style={{ ...styles.btn, width: focused ? 80 : 70 }}
        activeOpacity={0.8}
        onPress={() => console.log('tabBarIcon')}
      >
        <Feather name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    ),

    headerLeft: () => {
      return (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          activeOpacity={0.3}
          onPress={() => {
            console.log('bask to the Posts');
            navigation.navigate('Posts');
          }}
        >
          <Feather name="arrow-left" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      );
    },
  };

  const optionsProfile = {
    headerShown: false,
    tabBarAccessibilityLabel: true,

    tabBarIcon: ({ focused, size, color }) => (
      <Feather
        style={{ alignSelf: 'flex-start', marginLeft: 39 }}
        name="user"
        size={24}
        color={focused ? '#212121' : color}
      />
    ),
  };

  return (
    <Tabs.Navigator
      initialRouteName="Posts"
      screenOptions={{ tabBarShowLabel: false }}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6C00',
    height: 40,
    borderRadius: 100,
  },
});