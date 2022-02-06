import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import IndexPage from "../components/pages";
import AppContext from "../store/context";

const Index = () => {
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        router.push("/signup");
      }
    });
  }, []);

  return <>{currentUser !== null && <IndexPage />}</>;
};

export default Index;
