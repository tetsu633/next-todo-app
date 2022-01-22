import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { pushTodoData } from "../../firebase";

// 作成画面
const CreateTodo = () => {
  const [todo, setTodo] = useState({
    title: "",
    detail: "",
    status: "未完了",
    term: "",
  });
  const router = useRouter();

  // 追加ボタン押下時の処理
  const onClickAddButton = async (e) => {
    e.preventDefault();
    await pushTodoData(todo);
    router.push("/todos");
  };
  return (
    <>
      <form>
        <label htmlFor="title">title</label>
        <input
          id="title"
          type="text"
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />
        <br />
        <label htmlFor="detail">detail</label>
        <textarea
          id="detail"
          cols="30"
          rows="10"
          onChange={(e) => setTodo({ ...todo, detail: e.target.value })}
        />
        <br />
        <label>status</label>
        <select
          defaultValue="未完了"
          onChange={(e) => setTodo({ ...todo, status: e.target.value })}
        >
          <option value="完了">完了</option>
          <option value="途中">途中</option>
          <option value="未完了">未完了</option>
        </select>
        <br />
        <Link href="/todos">
          <button>戻る</button>
        </Link>
        <button
          onClick={(e) => {
            onClickAddButton(e);
          }}
        >
          作成
        </button>
      </form>
    </>
  );
};

export default CreateTodo;
