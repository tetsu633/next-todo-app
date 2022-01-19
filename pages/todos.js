import Link from "next/link";

const dummyTodoData = [
  {
    id: 1,
    title: "task1",
    detail: "task1をやる",
    status: "完了",
    term: "2022-01-16",
  },
  {
    id: 2,
    title: "task2",
    detail: "task2をやる",
    status: "途中",
    term: "2022-01-17",
  },
  {
    id: 3,
    title: "task3",
    detail: "task3をやる",
    status: "未完了",
    term: "2022-01-18",
  },
];

const Todos = () => {
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
        {dummyTodoData.map((todo) => (
          <li key={todo.id}>
            <p>{todo.title}</p>
            <p>{todo.status}</p>
            <p>{todo.term}</p>
            <button>詳細</button>
            <button>編集</button>
            <button>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
