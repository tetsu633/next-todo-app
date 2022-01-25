import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import Detail from "../../components/pages/Detail";
import Edit from "../../components/pages/edit";

const Post = ({ paths, todo }) => {
  return paths.length === 1 ? <Detail todo={todo} /> : <Edit todo={todo} />;
};

export const getServerSideProps = async (context) => {
  const paths = context.params.id;
  const todoId = paths[0];

  const q = query(collection(db, "todos"), where("id", "==", Number(todoId)));
  const todo = await getDocs(q)
    .then((res) => {
      return { docId: res.docs.shift().id, ...res.docs.shift().data() };
    })
    .catch((e) => {
      console.log(e);
      return null;
    });

  return {
    props: {
      paths,
      todo,
    },
  };
};

export default Post;
