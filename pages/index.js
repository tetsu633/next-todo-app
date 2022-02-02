import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Index = () => {
  const [currentUser, setCurrentUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    currentUser === "" && router.push("/signup");
  }, []);
  return <>index</>;
};

export default Index;
