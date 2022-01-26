import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { db } from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import AppContext from "../../store/context";

const Detail = ({ todoId }) => {
  const { todos } = useContext(AppContext);
  const [todo, setTodo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const targetIndex = todos.findIndex((todo) => todo.id === Number(todoId));
    setTodo(todos[targetIndex]);
  }, []);

  // 削除ボタン押下時の処理
  const onClickDeleteButton = async (docId) => {
    await deleteDoc(doc(db, "todos", docId)).then(
      router.push("/").catch((e) => console.log(e))
    );
  };

  return (
    <div>
      {todo !== undefined && todo !== null && (
        <>
          <dl>
            <dt>title</dt>
            <dd>{todo.title}</dd>
            <dt>detail</dt>
            <dd>{todo.detail}</dd>
            <dt>status</dt>
            <dd>{todo.status}</dd>
          </dl>
          <Link href="/">
            <button>戻る</button>
          </Link>
          <button onClick={() => onClickDeleteButton(todo.docId)}>削除</button>
          <Link href={`/${todo.id}/edit`}>
            <button>編集</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Detail;
