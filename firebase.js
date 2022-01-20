import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";

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
    // use dummydata
    await addDoc(collection(db, "todos"), {
      id: 1,
      title: "dummy",
      detail: "dummyをやる",
      status: "未完了",
      term: "2022-01-18",
    });
  } catch (e) {
    console.log(e);
  }
};

// get todos data
export const getTodosData = async () => {
  const querySnapshot = await getDocs(collection(db, "todos")).then((res) => {
    if (res) {
      const todos = res.docs.map((doc) => doc.data());
      return todos;
    } else {
      console.log("Something wrong with fetching firebase");
      return null;
    }
  });
  return querySnapshot;
};

// get todo data
export const getTodoData = async (todoId) => {
  const q = query(collection(db, "todos"), where("id", "==", Number(todoId)));
  const querySnapshot = await getDocs(q).then((res) => {
    if (res) {
      const todo = {
        docId: res.docs.shift().id,
        ...res.docs.shift().data(),
      };
      return todo;
    } else {
      console.log("No such document");
      return null;
    }
  });
  return querySnapshot;
};

// update todo data
export const updateTodoData = async (docId, todo) => {
  const newTodoData = {
    title: todo.title,
    detail: todo.detail,
    status: todo.status,
  };
  const todoRef = doc(db, "todos", docId);
  await updateDoc(todoRef, newTodoData);
};
