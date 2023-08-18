import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useSelector } from 'react-redux';
import { emailSelector, nickNameSelector } from '../redux/auth/selectors';
import avatar from '../assets/img/Avatar.jpg';

export function PostsScreen() {
  const [posts, setPosts] = useState(null);
  const nickName = useSelector(nickNameSelector);
  const email = useSelector(emailSelector);

  const navigation = useNavigation();

  useEffect(() => {
    getAllPostsFromServer();
  }, []);

  const getAllPostsFromServer = async () => {
    try {
      const q = collection(db, 'photoPosts');

      const unsubscribe = onSnapshot(q, querySnapshot => {
        let data = [];

        querySnapshot.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() });
        });

        setPosts(data);
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 32,
          paddingHorizontal: 16,
          width: '100%',
        }}
      >
        <Image
          style={{ width: 60, height: 60, borderRadius: 16 }}
          source={avatar}
        />
        <View style={{ marginLeft: 8 }}>
          <Text
            style={{ fontFamily: 'Roboto-700', fontSize: 13, color: '#212121' }}
          >
            {nickName}
          </Text>
          <Text
            style={{
              fontFamily: 'Roboto-400',
              fontSize: 11,
              color: 'rgba(33, 33, 33, 0.80)',
            }}
          >
            {email}
          </Text>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View>
            <View>
              <Image
                source={item.photo}
                style={{
                  marginTop: 10,
                  width: 400,
                  height: 240,
                  borderColor: 'green',
                  borderWidth: 1,
                  borderRadius: 8,
                }}
              />
            </View>

            <Text
              style={{
                marginTop: 5,
                fontFamily: 'Roboto-500',
                fontSize: 16,
                color: '#212121',
              }}
            >
              {item.inputTitlePhoto}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 8,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      navigation.navigate('Comments', {
                        postId: item.id,
                        photo: item.photo,
                      });
                    }}
                  >
                    <Feather name="message-circle" size={24} color="#BDBDBD" />
                  </TouchableOpacity>
                  <Text
                    style={{
                      marginLeft: 6,
                      color: '#BDBDBD',
                      fontFamily: 'Roboto-400',
                      fontSize: 16,
                    }}
                  >
                    {item.countComment ? item.countComment : 0}
                  </Text>
                </View>

                <View>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    activeOpacity={0.8}
                    onPress={() => {
                      navigation.navigate('Map', { location: item.location });
                    }}
                  >
                    <View>
                      <Feather name="map-pin" size={24} color="#BDBDBD" />
                    </View>

                    <View style={{ marginLeft: 4 }}>
                      <Text
                        style={{
                          fontFamily: 'Roboto-400',
                          fontSize: 16,
                          color: '#212121',
                        }}
                      >
                        {item.inputLocation}
                      </Text>

                      <Text
                        style={{
                          fontFamily: 'Roboto-400',
                          fontSize: 10,
                          color: '#212121',
                        }}
                      >
                        {`${item.address.city}, ${item.address.country}`}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});