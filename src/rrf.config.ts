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
  // FB config here
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
