import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// initialize firebase config
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// create todo data
export const pushTodoData = async () => {
  try {
    await setDoc(doc(db, "todos", "1"), {
      title: "dummy",
      detail: "dummyをやる",
      status: "未完了",
      term: "2022-01-18",
    });
  } catch (e) {
    console.log(e);
  }
};
