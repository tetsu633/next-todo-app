import Link from "next/link";
import { useContext } from "react";

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import AppContext from "../store/context";

const Todos = () => {
  const { todos } = useContext(AppContext);

  // Todoの削除
  const onClickDeleteButton = async (docId) => {
    await deleteDoc(doc(db, "todos", docId));
  };

  return (
    <div>
      <header>
        <p>Todo一覧</p>
        <Link href="/create">
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
        {todos !== undefined &&
          todos.map((todo) => (
            <li key={todo.id}>
              <p>{todo.title}</p>
              <p>{todo.status}</p>
              <p>{todo.term}</p>
              <Link href={`/${todo.id}`}>
                <button>詳細</button>
              </Link>
              <Link href={`/${todo.id}/edit`}>
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
