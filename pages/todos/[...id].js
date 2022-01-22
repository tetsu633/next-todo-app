import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { getTodoData, updateTodoData } from "../../firebase";

const Post = ({ paths, todo }) => {
  return paths.length === 1 ? <Detail todo={todo} /> : <Edit todo={todo} />;
};

// 詳細画面
const Detail = ({ todo }) => {
  return (
    <div>
      <dl>
        <dt>title</dt>
        <dd>{todo.title}</dd>
        <dt>detail</dt>
        <dd>{todo.detail}</dd>
        <dt>status</dt>
        <dd>{todo.status}</dd>
      </dl>
      <Link href="/todos">
        <button>戻る</button>
      </Link>
      <button>削除</button>
      <Link href={`${todo.id}/edit`}>
        <button>編集</button>
      </Link>
    </div>
  );
};

// 編集画面
const Edit = (props) => {
  const [todo, setTodo] = useState(props.todo);
  const router = useRouter();

  // 保存ボタン押下時の処理
  const onClickUpdateButton = async (e) => {
    e.preventDefault();
    await updateTodoData(todo.docId, todo);
    router.push("/todos");
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

export const getServerSideProps = async (context) => {
  const paths = context.params.id;
  const todoId = paths[0];
  const todo = await getTodoData(todoId);

  return {
    props: {
      paths,
      todo,
    },
  };
};

export default Post;
