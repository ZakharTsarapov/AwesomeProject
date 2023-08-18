import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  nickName: null,
  email: null,
  isLoggetIn: false,
  collectionId: null,
  avatar: null,
};

export const sliceAuth = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (state, action) => ({
      ...state,
      userId: action.payload.userId,
      nickName: action.payload.nickName,
      email: action.payload.email,
      avatar: action.payload.avatar,
    }),
    authStateChange: (state, action) => ({
      ...state,
      isLoggetIn: action.payload.isLoggetIn,
    }),
    authSignOut: () => state,
    updateCollectionId: (state, action) => {
      state.collectionId = action.payload;
    },
  },
});

export const {
  updateUserProfile,
  authStateChange,
  authSignOut,
  updateCollectionId,
} = sliceAuth.actions;