import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCdTVzjKzDXvjpmlLSiNzDD6WwdPWcpvkI",
  authDomain: "ifro-project.firebaseapp.com",
  databaseURL: "https://ifro-project.firebaseio.com",
  projectId: "ifro-project",
  storageBucket: "ifro-project.appspot.com",
  messagingSenderId: "561794392708",
  appId: "1:561794392708:web:3cb5d5531d52facf1518d1",
};
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        adminStatus: false,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};
export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider(); //enable google-signin pop-up
provider.setCustomParameters({ promt: "selected_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
