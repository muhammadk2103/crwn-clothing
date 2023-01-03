// import firebase from 'firebase';
import {initializeApp} from 'firebase/app';
import { doc, getFirestore, getDoc, setDoc } from '@firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyBJHEnjw4TPtugk7ytSF6t9LoIVQusWU2I",
  authDomain: "crwn-db-e6549.firebaseapp.com",
  projectId: "crwn-db-e6549",
  storageBucket: "crwn-db-e6549.appspot.com",
  messagingSenderId: "872158031838",
  appId: "1:872158031838:web:559452965f570ae4f9f74f",
  measurementId: "G-CSF43CXGX1"
};

const app = initializeApp(config);

export const auth = getAuth();
export const firestore = getFirestore(app);

export const creaeteUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  
  const userRef = doc(firestore, `users/${userAuth.uid}`);
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('here is a prob: ', error);
    }
  }
  return userRef;
}

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default app;