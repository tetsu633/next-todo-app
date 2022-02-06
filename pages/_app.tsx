import { AppProps } from "next/app";
import React, { useState } from "react";

import AppContext from "../store/context";
import { ChakraProvider } from "@chakra-ui/provider";
import { ColorModeProvider } from "@chakra-ui/react";
import { theme } from "../theme";

const App = ({ Component, pageProps }: AppProps) => {
  const [todos, setTodos] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <React.StrictMode>
      <AppContext.Provider
        value={{
          todos,
          setTodos,
          currentUser,
          setCurrentUser,
          filterText,
          setFilterText,
        }}
      >
        <ChakraProvider theme={theme}>
          <ColorModeProvider
            options={{ initialColorMode: "light", useSystemColorMode: false }}
          />
          <Component {...pageProps} />
        </ChakraProvider>
      </AppContext.Provider>
    </React.StrictMode>
  );
};

export default App;
