import Link from "next/link";
import { getTodoData } from "../../firebase";

const Post = ({ paths, todo }) => {
  return paths.length === 1 ? <Detail todo={todo} /> : <Edit />;
};

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
