import Link from "next/link";
import { useEffect, useState } from "react";

import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Todos = () => {
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "todos"), (querySnapshot) => {
      setTodos(
        querySnapshot.docs.map((doc) => {
          return { docId: doc.id, ...doc.data() };
        })
      );
    });
    return () => unsub();
  }, []);

  // Todoの削除
  const onClickDeleteButton = async (docId) => {
    await deleteDoc(doc(db, "todos", docId));
  };

  return (
    <div>
      <header>
        <p>Todo一覧</p>
        <Link href="/todos/create">
          <button>create</button>
        </Link>
      </header>
      <div>
        <div>
          <input type="text" placeholder="タイトルで絞り込み" />
          <button>検索</button>
        </div>
        <div>
          <select>
            <option value="test1">test1</option>
            <option value="test2">test2</option>
            <option value="test3">test3</option>
          </select>
          <button>検索</button>
        </div>
      </div>
      <ul>
        {todos !== null &&
          todos.map((todo) => (
            <li key={todo.id}>
              <p>{todo.title}</p>
              <p>{todo.status}</p>
              <p>{todo.term}</p>
              <Link href={`todos/${todo.id}`}>
                <button>詳細</button>
              </Link>
              <Link href={`todos/${todo.id}/edit`}>
                <button>編集</button>
              </Link>
              <button
                onClick={() => {
                  onClickDeleteButton(todo.docId);
                }}
              >
                削除
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Todos;
