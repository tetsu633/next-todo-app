const { extendTheme } = require("@chakra-ui/react");

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "'Hiragino Sans', sans-serif",
      },
    },
  },
});
