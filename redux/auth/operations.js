import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSignOut, authStateChange, updateUserProfile } from "./sliceAuth";

export const authSignUpUser =
  ({ login, email, password, avatar }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: login,
        avatarPhoto: avatar,
      });

      const { uid, displayName, avatarPhoto } = auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: uid,
          nickName: displayName,
          email,
          avatar: avatarPhoto,
        })
      );
    } catch (error) {
      throw error.message;
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error.message;
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  dispatch(authSignOut());
  await signOut(auth);
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      const displayName = user.displayName;
      const email = user.email;

      dispatch(
        updateUserProfile({
          userId: uid,
          nickName: displayName,
          email: email,
        })
      );
      dispatch(authStateChange({ isLoggetIn: true }));
    }
  });
};
