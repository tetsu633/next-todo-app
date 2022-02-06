import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { db } from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import AppContext from "../../store/context";
import {
  Box,
  Flex,
  FormControl,
  Input,
  Textarea,
  Stack,
} from "@chakra-ui/react";
import Header from "../ui/header/header";
import SButton from "../ui/button/base-button";
import SFormLabel from "../ui/label/form-label";

const DetailPage = () => {
  const { todos } = useContext(AppContext);
  const [todo, setTodo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const todoId = router.query.id.shift();
    const targetIndex = todos.findIndex((todo) => todo.id === Number(todoId));
    setTodo(todos[targetIndex]);
  }, []);

  // 削除ボタン押下時の処理
  const onClickDeleteButton = async (docId) => {
    await deleteDoc(doc(db, "todos", docId)).then(
      router.push("/").catch((e) => console.log(e))
    );
  };

  // 戻るボタン押下時の処理
  const onClickReturnButton = () => {
    router.push("/");
  };

  return (
    <Box maxH={"100vh"}>
      <Header />
      {todo !== null && (
        <Flex p={12} direction={"column"} align={"center"}>
          <Stack w={"full"}>
            <FormControl isReadOnly>
              <Flex>
                <SFormLabel>Title</SFormLabel>
                <Input value={todo.title} userSelect="none" />
              </Flex>
            </FormControl>
            <FormControl isReadOnly>
              <Flex>
                <SFormLabel>Detail</SFormLabel>
                <Textarea value={todo.detail} userSelect="none" />
              </Flex>
            </FormControl>
            <FormControl isReadOnly>
              <Flex>
                <SFormLabel>Status</SFormLabel>
                <Input value={todo.status} userSelect="none" />
              </Flex>
            </FormControl>
            <Flex justifyContent="right">
              <SButton bg="blue" onClick={() => onClickReturnButton()}>
                戻る
              </SButton>
              <SButton bg="red" onClick={() => onClickDeleteButton(todo.docId)}>
                削除
              </SButton>
              <SButton
                bg="green"
                onClick={() => router.push(`/${todo.id}/edit`)}
              >
                編集
              </SButton>
            </Flex>
          </Stack>
        </Flex>
      )}
    </Box>
  );
};

export default DetailPage;
