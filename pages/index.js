import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import IndexPage from "../components/pages";

const Index = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  // useEffect(() => {
  //   currentUser === "" && router.push("/signup");
  // }, []);

  return <IndexPage />;
};

export default Index;
