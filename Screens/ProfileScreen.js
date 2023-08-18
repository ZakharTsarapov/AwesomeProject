import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { nickNameSelector, userIdSelector } from "../redux/auth/selectors";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { FlatList } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import imageBG from "../assets/img/photo-bg.jpg";
import avatarSource from "../assets/img/avatar-1.jpg";
import { BtnLogout } from "../helpers/BtnLogout";

export function ProfileScreen() {
  const [userPosts, setUserPosts] = useState(null);
  const userId = useSelector(userIdSelector);
  const nickName = useSelector(nickNameSelector);

  const navigation = useNavigation();

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    try {
      const q = query(
        collection(db, "photoPosts"),
        where("userId", "==", userId)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let data = [];

        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });

        setUserPosts(data);
      });
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <ImageBackground style={styles.imageBG} source={imageBG}>
      <View style={styles.container}>
        <View style={styles.wrapUser}>
          <View style={{ zIndex: 1 }}>
            <Image style={styles.imgAvatar} source={avatarSource} />
            <BtnLogout styleProp={{ alignSelf: "flex-end" }} />
          </View>

          <View style={{ marginBottom: 33 }}>
            <Text style={styles.titleUser}>{nickName}</Text>
          </View>
        </View>

        <View style={styles.postsWrap}>
          <FlatList
            data={userPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <View style={styles.wrapImage}>
                  <Image style={styles.image} source={item.photo} />
                </View>

                <View style={styles.wrapTitleImage}>
                  <Text style={styles.titleImage}>{item.inputTitlePhoto}</Text>
                </View>

                <View style={styles.wrapDescript}>
                  <View style={styles.commentLike}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        navigation.navigate("Comments", {
                          postId: item.id,
                        });
                      }}
                    >
                      <Feather
                        name="message-circle"
                        size={24}
                        color="#FF6C00"
                      />
                    </TouchableOpacity>
                    <Text style={styles.titleCount}>
                      {item.countComment ? item.countComment : 0}
                    </Text>

                    <TouchableOpacity
                      style={{ marginLeft: 24 }}
                      activeOpacity={0.8}
                      onPress={() => console.log("add like")}
                    >
                      <Feather name="thumbs-up" size={24} color="#FF6C00" />
                    </TouchableOpacity>
                    <Text style={styles.titleCount}>0</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.wrapLocation}
                    activeOpacity={0.8}
                    onPress={() => {
                      navigation.navigate("Map", {
                        location: item.location,
                      });
                    }}
                  >
                    <View>
                      <Feather name="map-pin" size={24} color="#BDBDBD" />
                    </View>

                    <View style={styles.wrapTitleLocation}>
                      <Text style={styles.titleLocation}>
                        {`${item.address.country}`}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "85%",
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
  },

  imageBG: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  wrapUser: {
    marginTop: 32,
  },
  imgAvatar: {
    position: "absolute",
    top: -60,
    left: "35%",
  },
  titleUser: {
    marginTop: 65,
    textAlign: "center",
    fontFamily: "Roboto-500",
    fontSize: 30,
    letterSpacing: 0.3,
    color: "#212121",
  },
  postsWrap: {
    flex: 2,
    backgroundColor: "#fff",
  },
  image: {
    width: 396,
    height: 240,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  wrapTitleImage: {
    marginVertical: 8,
  },
  titleImage: {
    fontFamily: "Roboto-500",
    fontSize: 16,
    color: "#212121",
  },
  wrapDescript: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 34,
  },
  commentLike: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleCount: {
    marginLeft: 6,
    color: "#BDBDBD",
    fontFamily: "Roboto-400",
    fontSize: 16,
  },
  wrapLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  wrapTitleLocation: {
    marginLeft: 4,
  },
  titleLocation: {
    fontFamily: "Roboto-400",
    fontSize: 16,
    color: "#212121",
  },
});
