import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

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

    // IDの最大値を取得
    const lastId = await getDocs(collection(db, "todos")).then((res) => {
      const id = res.docs.map((doc) => doc.data().id);
      return id.length !== 0 ? Math.max(...id) : 0;
    });

    const newTodo = { ...todo, id: lastId + 1 };
    try {
      await addDoc(collection(db, "todos"), newTodo)
        .then(router.push("/"))
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
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
        <Link href="/">
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
