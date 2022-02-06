import { useRouter } from "next/router";

import DetailPage from "../components/pages/detail";
import EditPage from "../components/pages/edit";

const Post = () => {
  const router = useRouter();
  const id = router.query.id;

  return id.length === 1 ? <DetailPage /> : <EditPage />;
};

export default Post;
