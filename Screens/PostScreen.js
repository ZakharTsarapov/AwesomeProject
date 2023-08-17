import { useNavigation, useRoute } from '@react-navigation/native';
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
import avatar from '../assets/img/Avatar.jpg';

export function PostsScreen() {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  const { params } = useRoute();
  useEffect(() => {
    if (params) {
      setPosts(prev => [...prev, params]);
    }
  }, [params]);

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
            Natali Romanova
          </Text>
          <Text
            style={{
              fontFamily: 'Roboto-400',
              fontSize: 11,
              color: 'rgba(33, 33, 33, 0.80)',
            }}
          >
            email@example.com
          </Text>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View>
            <View style={styles.wrapImage}>
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
                      navigation.navigate('Comments');
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
                    0
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
                      navigation.navigate('Map', { location: params.location });
                    }}
                  >
                    <View>
                      <Feather
                        name="map-pin"
                        size={24}
                        color="#BDBDBD"
                      />
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
  wrapImage: {},
});
