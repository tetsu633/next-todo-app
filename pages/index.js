import Link from "next/link";
import { useContext, useRef, useState } from "react";

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import AppContext from "../store/context";

const Todos = () => {
  const { todos } = useContext(AppContext);
  const [filterText, setFilterText] = useState("");
  const inputElement = useRef();

  // Todoの削除
  const onClickDeleteButton = async (docId) => {
    await deleteDoc(doc(db, "todos", docId));
  };

  // フィルターボタン押下時の処理
  const onClickFilterButton = () => {
    setFilterText(inputElement.current.value);
  };

  // クリアボタン押下時の処理
  const onClickClearButton = () => {
    setFilterText("");
    inputElement.current.value = "";
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
          <input
            ref={inputElement}
            type="text"
            placeholder="タイトルで絞り込み"
          />
          <button onClick={() => onClickFilterButton()}>検索</button>
          <button onClick={() => onClickClearButton()}>クリア</button>
        </div>
      </div>
      <ul>
        {todos !== undefined && filterText !== ""
          ? todos
              .filter((todo) => {
                return todo.title.includes(filterText);
              })
              .map((todo) => (
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
              ))
          : todos !== undefined &&
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
