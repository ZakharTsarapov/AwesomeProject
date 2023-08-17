import { useRoute } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export function MapScreen() {
  const { params } = useRoute();

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapView}
        initialRegion={{
          latitude: `${params.location.latitude}`,
          longitude: `${params.location.longitude}`,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: `${params.location.latitude}`,
            longitude: `${params.location.longitude}`,
          }}
          title="PhotoTitle"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    flex: 1,
  },
});
