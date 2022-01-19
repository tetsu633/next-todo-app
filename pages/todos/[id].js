import Link from "next/link";

const dummyTodosData = [
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

const Detail = () => {
  return (
    <div>
      <dl>
        <dt>title</dt>
        <dd>{dummyTodosData[0].title}</dd>
        <dt>detail</dt>
        <dd>{dummyTodosData[0].detail}</dd>
        <dt>status</dt>
        <dd>{dummyTodosData[0].status}</dd>
      </dl>
      <Link href="/todos">
        <button>戻る</button>
      </Link>
      <button>削除</button>
      <button>編集</button>
    </div>
  );
};
export default Detail;
