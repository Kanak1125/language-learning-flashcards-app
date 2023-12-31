import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(firebase_app);

export const db = getFirestore(firebase_app);

export const database = {
  categories: collection(db, "categories"),
  cards: collection(db, "cards"),
  // categoryRef: (categoryId) => doc(db, "categories", categoryId),
  // cardRef: doc(db, "cards", cardId),
  formatDoc: (doc) => { // function to format doc (i.e. add the doc id to the existing doc.data() object)...
    return {
      id: doc.id,
      ...doc.data(),
    }
  },
  getCurrentTimeStamp: serverTimestamp,
}
// export default firebase_app;