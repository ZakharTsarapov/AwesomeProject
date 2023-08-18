import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { db } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { nickNameSelector, userIdSelector } from "../redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { updateCollectionId } from "../redux/auth/sliceAuth";

export function CreatePostsScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [inputTitlePhoto, setInputTitlePhoto] = useState("");
  const [inputLocation, setInputLocation] = useState("");
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);

  const nickName = useSelector(nickNameSelector);
  const userId = useSelector(userIdSelector);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Запит на доступ до геолокації був відхиленний");
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Немає доступу до камери</Text>
      </View>
    );
  }

  async function takePhoto() {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      const photoLib = await MediaLibrary.createAssetAsync(uri);
      setPhoto(photoLib);

      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);

      const address = await Location.reverseGeocodeAsync(coords);
      setAddress(address[0]);
    }
  }

  function onFlipCamera() {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  }

  function onPublish() {
    if (!photo || !location || !inputLocation || !inputTitlePhoto) {
      console.warn("Зробіть фото та заповніть поля");
      return;
    }

    uploadDataToServer();
    navigation.navigate("Posts");
    setInputTitlePhoto("");
    setInputLocation("");
    setPhoto(null);
  }

  async function uploadDataToServer() {
    try {
      const docRef = await addDoc(collection(db, "photoPosts"), {
        photo,
        inputTitlePhoto,
        inputLocation,
        location,
        address,
        nickName,
        userId,
      });

      dispatch(updateCollectionId(docRef.id));
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View>
          <View style={styles.wrapCamera}>
            <Camera style={styles.camera} type={type} ref={setCameraRef}>
              <TouchableOpacity
                style={styles.btnCamera}
                activeOpacity={0.8}
                onPress={takePhoto}
              >
                <Feather name="camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </Camera>

            <View style={styles.wrapBtnFlip}>
              <TouchableOpacity
                style={styles.btnFlip}
                activeOpacity={0.8}
                onPress={onFlipCamera}
              >
                <Ionicons
                  name="ios-camera-reverse-outline"
                  size={24}
                  color="#BDBDBD"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.wrapBtnDownloadPhoto}>
              <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
                <Text style={styles.btnDownloadPhoto}>Завантажте фото</Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 32 }}>
              <TextInput
                style={styles.input}
                textAlign="left"
                placeholder="Назва..."
                value={inputTitlePhoto}
                onChangeText={(value) => setInputTitlePhoto(value)}
              />
            </View>

            <View style={{ marginTop: 16 }}>
              <TextInput
                style={{ ...styles.input, paddingLeft: 28 }}
                textAlign="left"
                placeholder="Місцевість..."
                value={inputLocation}
                onChangeText={(value) => setInputLocation(value)}
              />
              <Feather
                style={{ position: "absolute", top: "25%", left: 2 }}
                name="map-pin"
                size={24}
                color="#BDBDBD"
              />
            </View>

            <View
              style={{
                flexDirection: "column",
                alignContent: "space-between",
              }}
            >
              <View>
                <TouchableOpacity
                  style={{
                    ...styles.btn,
                    backgroundColor:
                      photo && location && inputLocation && inputTitlePhoto
                        ? "#FF6C00"
                        : "#F6F6F6",
                  }}
                  activeOpacity={0.8}
                  onPress={onPublish}
                >
                  <Text
                    style={{
                      ...styles.btnTitle,
                      color:
                        photo && location && inputLocation && inputTitlePhoto
                          ? "#FFFFFF"
                          : "#BDBDBD",
                    }}
                  >
                    Опубліковати
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.btnTrush}
            activeOpacity={0.8}
            onPress={() => {}}
          >
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  wrapCamera: {
    marginHorizontal: 16,
    marginTop: 32,
  },
  camera: {
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  btnCamera: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.30)",
    borderRadius: 50,
  },
  wrapBtnFlip: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  btnFlip: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.10)",
    borderRadius: 50,
  },
  wrapBtnDownloadPhoto: {
    marginTop: 8,
  },
  btnDownloadPhoto: {
    color: "#BDBDBD",
    fontFamily: "Roboto-400",
    fontSize: 16,
  },
  input: {
    paddingLeft: 16,
    height: 50,
    fontFamily: "Roboto-400",
    fontSize: 16,
    borderBottomWidth: 1,
    borderRadius: 6,
    color: "#212121",
    borderColor: "#E8E8E8",
  },
  btn: {
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  btnTitle: {
    paddingVertical: 16,
    fontSize: 16,
    color: "#fff",
  },
  btnTrush: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    marginBottom: 34,
    width: 70,
    height: 40,
    borderRadius: 100,
  },
});
