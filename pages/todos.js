import Link from "next/link";

import { getTodoData } from "../firebase";

const Todos = ({ todos }) => {
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
              <button>削除</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export const getServerSideProps = async () => {
  const todos = await getTodoData();
  return {
    props: { todos },
  };
};

export default Todos;
