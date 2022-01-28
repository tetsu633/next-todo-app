import React, { useEffect, useState } from "react";

import AppContext from "../store/context";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase";
import { ChakraProvider } from "@chakra-ui/provider";

const App = ({ Component, pageProps }) => {
  const [todos, setTodos] = useState();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "todos"), (querySnapshot) => {
      setTodos(
        querySnapshot.docs.map((doc) => {
          return { docId: doc.id, ...doc.data() };
        })
      );
    });
    return () => unsub();
  }, []);

  return (
    <React.StrictMode>
      <AppContext.Provider value={{ todos }}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </AppContext.Provider>
    </React.StrictMode>
  );
};

export default App;
