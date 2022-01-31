import { useRef } from "react";

import { Box, Input, Button } from "@chakra-ui/react";

const TodoSearch = ({ props }) => {
  const { setFilterText } = props;
  const inputElement = useRef();

  // フィルターボタン押下時の処理
  const onClickFilterButton = () => {
    setFilterText(inputElement.current.value);
  };

  // クリアボタン押下時の処理
  const onClickClearButton = () => {
    setFilterText("");
    inputElement.current.value = "";
  };

  return (
    <Box mt={4}>
      <Input
        type="text"
        placeholder="タイトルで絞り込み"
        w={64}
        ref={inputElement}
      />
      <Button mx={1} onClick={() => onClickFilterButton()}>
        検索
      </Button>
      <Button mx={1} onClick={() => onClickClearButton()}>
        クリア
      </Button>
    </Box>
  );
};

export default TodoSearch;
