import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/storage';
import { ReactReduxFirebaseProviderProps } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import store from './store';

// Firebase Init
const firebaseConfig = {
  apiKey: "AIzaSyCgtk4IYCHk9VMZtXmPOgMkFXkFj41IMxs",
  authDomain: "nhco-filemanager.firebaseapp.com",
  databaseURL: "https://nhco-filemanager.firebaseio.com",
  projectId: "nhco-filemanager",
  storageBucket: "nhco-filemanager.appspot.com",
  messagingSenderId: "892618766738",
  appId: "1:892618766738:web:a2191a1510fb476579694b",
  measurementId: "G-SPX5T9N9H8"
};

const rrfConfig = {
  userProfile: 'users_meta',
  useFirestoreForProfile: true,
};

export const rrfProps: ReactReduxFirebaseProviderProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.analytics();
export const storage = firebase.storage();
