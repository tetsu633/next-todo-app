import { useRouter } from "next/router";
import { useState } from "react";

import { db } from "../../firebase";
import { updateDoc, doc } from "firebase/firestore";

const Edit = (props) => {
  const [todo, setTodo] = useState(props.todo);
  const router = useRouter();

  // 保存ボタン押下時の処理
  const onClickUpdateButton = async (e) => {
    e.preventDefault();

    const newTodo = {
      title: todo.title,
      detail: todo.detail,
      status: todo.status,
    };

    await updateDoc(doc(db, "todos", todo.docId), newTodo).then(
      router.push("/todos").catch((e) => console.log(e))
    );
  };

  return (
    <div>
      <form>
        <label htmlFor="title">title</label>
        <input
          id="title"
          type="text"
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />
        <br />
        <label htmlFor="detail">detail</label>
        <textarea
          id="detail"
          cols="30"
          rows="10"
          value={todo.detail}
          onChange={(e) => setTodo({ ...todo, detail: e.target.value })}
        ></textarea>
        <br />
        <label>status</label>
        <select
          defaultValue={todo.status}
          onChange={(e) => setTodo({ ...todo, status: e.target.value })}
        >
          <option value="完了">完了</option>
          <option value="途中">途中</option>
          <option value="未完了">未完了</option>
        </select>
        <br />
        <button
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
        >
          戻る
        </button>
        <button
          onClick={(e) => {
            onClickUpdateButton(e);
          }}
        >
          保存
        </button>
      </form>
    </div>
  );
};

export default Edit;
