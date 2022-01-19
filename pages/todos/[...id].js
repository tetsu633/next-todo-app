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

const Post = ({ id }) => {
  return id.length === 1 ? <Detail /> : <Edit />;
};

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

const Edit = () => {
  return (
    <div>
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
        <button>保存</button>
      </form>
    </div>
  );
};

export const getServerSideProps = (context) => {
  const { id } = context.params;
  return {
    props: { id },
  };
};

export default Post;
