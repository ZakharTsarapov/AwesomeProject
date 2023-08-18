import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { avatarSelector, nickNameSelector } from "../redux/auth/selectors";
import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { Feather } from "@expo/vector-icons";
import { getDateFormat } from "../helpers/date";

export function CommentsScreen() {
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const nickName = useSelector(nickNameSelector);
  const avatar = useSelector(avatarSelector);

  const { postId, photo } = useRoute().params;

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardWillShow", () => {
      setIsShowKeyboard(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardWillHide", () => {
      setIsShowKeyboard(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    getAllCommentsFromServer();
  }, [commentId]);

  const createCommentsPost = async () => {
    try {
      const date = getDateFormat();
      const ref = doc(db, "photoPosts", postId);

      const docRef = await addDoc(collection(ref, "Comments"), {
        nickName,
        comment,
        date,
      });

      setCommentId(docRef.id);
    } catch (error) {
      console.warn(error);
    }

    setComment("");
    Keyboard.dismiss();
  };

  const getAllCommentsFromServer = async () => {
    try {
      const coll = collection(db, `photoPosts/${postId}/Comments`);
      const snapshot = await getCountFromServer(coll);
      const count = snapshot.data().count;
      const ref = doc(db, "photoPosts", postId);
      const querySnapshot = await getDocs(collection(ref, "Comments"));
      await updateDoc(ref, { countComment: count });

      return setAllComments(() => {
        let data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        return data;
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  function onShowKeyboard() {
    setIsShowKeyboard(true);
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <View style={styles.wrapImage}>
            <Image style={styles.image} source={photo} />
          </View>

          <View style={styles.comments}>
            <FlatList
              data={allComments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={{
                    ...styles.wrapComment,
                    flexDirection:
                      nickName === item.nickName ? "row-reverse" : "row",
                  }}
                >
                  <View style={styles.wrapNickName}>
                    <Text
                      style={{
                        ...styles.nickName,
                        marginLeft: nickName === item.nickName ? 16 : 0,
                      }}
                    >
                      {item.nickName}
                    </Text>
                  </View>

                  <View style={styles.wrapTextComment}>
                    <Text style={styles.textComment}>{item.comment}</Text>
                    <Text style={styles.textTime}>{item.date}</Text>
                  </View>
                </View>
              )}
            />
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.wrapInput,
                marginBottom: isShowKeyboard ? 120 : 34,
              }}
            >
              <View>
                <TextInput
                  style={styles.input}
                  textAlign="left"
                  placeholder="Коментувати..."
                  multiline={true}
                  onFocus={onShowKeyboard}
                  value={comment}
                  onChangeText={setComment}
                />
              </View>

              <View style={styles.wrapBtn}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={createCommentsPost}
                >
                  <View style={styles.btn}>
                    <Feather name="arrow-up" size={24} color="#fff" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },

  wrapImage: {
    marginTop: 32,
    marginBottom: 10,
  },
  comments: {
    flex: 2,
    backgroundColor: "#fff",
  },
  image: {
    width: 396,
    height: 240,
    borderRadius: 8,
    backgroundColor: "#fff",
  },

  wrapInput: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    paddingLeft: 16,
    paddingRight: 47,

    paddingBottom: 16,
    paddingTop: 16,
    minWidth: "100%",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#E8E8E8",
    color: "#212121",
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto-500",
    fontSize: 16,
  },

  wrapBtn: {
    position: "absolute",
    right: 8,
  },
  btn: {
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    marginBottom: 100,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: `#8a2be2`,
    fontFamily: "Roboto-700",
    fontSize: 20,
    color: "#9370db",
  },

  wrapComment: {
    flexDirection: "row",
    marginTop: 24,
  },

  wrapNickName: {
    marginTop: 5,
    width: "20%",
  },
  nickName: {
    color: "brown",
    fontFamily: "Roboto-700",
    marginLeft: 16,
  },
  imgAvatar: {
    width: 28,
    height: 28,
    borderWidth: 1,
  },

  wrapTextComment: {
    marginTop: 5,
    padding: 16,
    width: "80%",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  textComment: {
    fontFamily: "Roboto-400",
    fontSize: 13,
    color: "#212121",
    lineHeight: 18,
  },
  textTime: {
    marginTop: 8,
    fontFamily: "Roboto-400",
    fontSize: 12,
    color: "#BDBDBD",
  },
});
