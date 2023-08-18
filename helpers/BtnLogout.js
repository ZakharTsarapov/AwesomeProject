import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../redux/auth/operations";
import { Feather } from "@expo/vector-icons";

export function BtnLogout({ styleProp }) {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={styleProp}
      activeOpacity={0.3}
      onPress={() => {
        dispatch(authSignOutUser());
      }}
    >
      <Feather name="log-out" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );
}
