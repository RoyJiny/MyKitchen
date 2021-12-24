import * as firebase from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA0QX4L5UzV4kWnlXQ_KtRv8xJaFARzXaY",
  authDomain: "workshop-6b826.firebaseapp.com",
  databaseURL: "https://workshop-6b826-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "workshop-6b826",
  storageBucket: "workshop-6b826.appspot.com",
  messagingSenderId: "225045444277",
  appId: "1:225045444277:web:927779f3c6ca6fac7970fc"
};

firebase.initializeApp(firebaseConfig);
const firestore = getFirestore();

export {firestore};
