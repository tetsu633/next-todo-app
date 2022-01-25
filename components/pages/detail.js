import Link from "next/link";
import { useRouter } from "next/router";

import { db } from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore";

const Detail = ({ todo }) => {
  const router = useRouter();

  // 削除ボタン押下時の処理
  const onClickDeleteButton = async (docId) => {
    await deleteDoc(doc(db, "todos", docId)).then(
      router.push("/todos").catch((e) => console.log(e))
    );
  };

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
      <button onClick={() => onClickDeleteButton(todo.docId)}>削除</button>
      <Link href={`${todo.id}/edit`}>
        <button>編集</button>
      </Link>
    </div>
  );
};

export default Detail;
