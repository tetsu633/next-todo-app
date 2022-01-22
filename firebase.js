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
  orderBy,
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

// get last todo id
const getLastTodoId = async () => {
  const q = query(collection(db, "todos"), orderBy("id", "asc"));
  const currentId = await getDocs(q)
    .then((res) => {
      if (res.docs.length !== 0) {
        return res.docs[res.docs.length - 1].data().id;
      } else {
        return 0;
      }
    })
    .catch((e) => {
      console.log(e);
    });

  return currentId;
};

// create todo data
export const pushTodoData = async (todo) => {
  const lastId = await getLastTodoId();
  const newTodo = { ...todo, id: lastId + 1 };

  try {
    await addDoc(collection(db, "todos"), newTodo);
  } catch (e) {
    console.log(e);
  }
};

// get todos data
export const getTodosData = async () => {
  return await getDocs(collection(db, "todos"))
    .then((res) => {
      const data = res.docs.map((doc) => doc.data());
      return data;
    })
    .catch((e) => {
      console.log(e);
    });
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

  await updateDoc(todoRef, newTodoData).catch((e) => console.log(e));
};
