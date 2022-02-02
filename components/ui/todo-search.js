import { useRef } from "react";

import { Box, Input } from "@chakra-ui/react";
import SButton from "./button/base-button";

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
      <SButton bg="gray" onClick={() => onClickFilterButton()}>
        検索
      </SButton>
      <SButton bg="gray" onClick={() => onClickClearButton()}>
        クリア
      </SButton>
    </Box>
  );
};

export default TodoSearch;
