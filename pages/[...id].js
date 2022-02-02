import { useRouter } from "next/router";

import Detail from "../components/pages/detail";
import Edit from "../components/pages/edit";

const Post = () => {
  const router = useRouter();
  const id = router.query.id;

  return id.length === 1 ? <Detail /> : <Edit />;
};

export default Post;
