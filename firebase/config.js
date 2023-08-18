
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDmUaifCKtGZ50RbnPcOmtTb-Rgqiym2q0",
    authDomain: "react-native-aws.firebaseapp.com",
    databaseURL: "https://react-native-aws-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "react-native-aws",
    storageBucket: "react-native-aws.appspot.com",
    messagingSenderId: "847109122211",
    appId: "1:847109122211:web:821ab3e5e2c54a4a35b716",
    measurementId: "G-NWMZ0SX20X"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);