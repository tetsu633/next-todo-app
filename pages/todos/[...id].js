import Detail from "../../components/pages/Detail";
import Edit from "../../components/pages/edit";

const Post = ({ paths, todoId }) => {
  return paths.length === 1 ? (
    <Detail todoId={todoId} />
  ) : (
    <Edit todoId={todoId} />
  );
};

export const getServerSideProps = async (context) => {
  const paths = context.params.id;
  const todoId = paths[0];

  return {
    props: {
      paths,
      todoId,
    },
  };
};

export default Post;
