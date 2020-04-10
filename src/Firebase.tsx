import { singletonGetter } from "./singletonGetter";
import * as firebase from "firebase";
import { observable } from "mobx";

export class Firebase {
  get = singletonGetter(Firebase);

  @observable
  firestore = undefined;

  constructor() {
    firebase.initializeApp({});
    this.firestore = firebase.firestore();
  }
}
