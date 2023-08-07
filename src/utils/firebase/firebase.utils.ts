import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  User,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA5dF3bmQLqsOOXl5rMyQA_EYGnZo6YsOU',
  authDomain: 'zedcommerce-9a785.firebaseapp.com',
  projectId: 'zedcommerce-9a785',
  storageBucket: 'zedcommerce-9a785.appspot.com',
  messagingSenderId: '82634876492',
  appId: '1:82634876492:web:4dde2016b770acc856f6e9',
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

const auth = getAuth();
const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const db = getFirestore();

const createUserDocumentFromAuth = async (userAuth: User) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  console.log({ userSnapshot });
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.error({ error });
    }
  }

  return userDocRef;
};

export { auth, signInWithGooglePopup, db, createUserDocumentFromAuth };
