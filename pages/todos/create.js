import Link from "next/link";
import { useRouter } from "next/router";

import { pushTodoData } from "../../firebase";

// 作成画面
const CreateTodo = () => {
  const router = useRouter();
  return (
    <>
      <form>
        <label htmlFor="title">title</label>
        <input id="title" type="text" />
        <br />
        <label htmlFor="detail">detail</label>
        <textarea id="detail" cols="30" rows="10"></textarea>
        <br />
        <label>status</label>
        <select defaultValue="未完了">
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
            e.preventDefault();
            pushTodoData();
            router.push("/todos");
          }}
        >
          作成
        </button>
      </form>
    </>
  );
};

export default CreateTodo;
