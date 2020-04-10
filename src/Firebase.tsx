import { singletonGetter } from "./singletonGetter";
import firebase from "firebase";
import { observable } from "mobx";

const firebaseConfig = {
  apiKey: "AIzaSyBJGCUEZiQnLggmg2hKYMFU5TRj_26FDgc",
  authDomain: "meal-schedule-45307.firebaseapp.com",
  databaseURL: "https://meal-schedule-45307.firebaseio.com",
  projectId: "meal-schedule-45307",
  storageBucket: "meal-schedule-45307.appspot.com",
  messagingSenderId: "808438742383",
  appId: "1:808438742383:web:cbf448b9608199321d3c9a",
};

export class Firebase {
  @observable
  firestore: firebase.firestore.Firestore;

  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.firestore = firebase.firestore();
  }
}

export const getFirebase = singletonGetter(Firebase);
