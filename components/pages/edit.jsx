import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";

import { db } from "../../firebase";
import { updateDoc, doc } from "firebase/firestore";
import AppContext from "../../store/context";
import {
  Box,
  Flex,
  FormControl,
  Input,
  Select,
  Textarea,
  Stack,
} from "@chakra-ui/react";
import Header from "../ui/header/header";
import SButton from "../ui/button/base-button";
import SFormLabel from "../ui/label/form-label";

const EditPage = () => {
  const { todos } = useContext(AppContext);
  const [todo, setTodo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const todoId = router.query.id.shift();
    const index = todos.findIndex((todo) => todo.id === Number(todoId));
    setTodo(todos[index]);
  }, []);

  // 保存ボタン押下時の処理
  const onClickUpdateButton = async () => {
    const newTodo = {
      title: todo.title,
      detail: todo.detail,
      status: todo.status,
    };

    await updateDoc(doc(db, "todos", todo.docId), newTodo).then(
      router.push("/").catch((e) => console.log(e))
    );
  };

  // 戻るボタン押下時の処理
  const onClickReturnButton = () => {
    router.back();
  };

  return (
    <Box maxH={"100vh"}>
      <Header />
      {todo !== undefined && todo !== null && (
        <Flex p={12} direction={"column"} align={"center"}>
          <Stack w={"full"}>
            <FormControl>
              <Flex>
                <SFormLabel htmlFor="title">Title</SFormLabel>
                <Input
                  id="title"
                  type="text"
                  value={todo.title}
                  onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                />
              </Flex>
            </FormControl>
            <FormControl>
              <Flex>
                <SFormLabel htmlFor="detail">Detail</SFormLabel>
                <Textarea
                  id="detail"
                  value={todo.detail}
                  onChange={(e) => setTodo({ ...todo, detail: e.target.value })}
                />
              </Flex>
            </FormControl>
            <FormControl>
              <Flex>
                <SFormLabel>Status</SFormLabel>
                <Select
                  w={32}
                  defaultValue={todo.status}
                  onChange={(e) => setTodo({ ...todo, status: e.target.value })}
                >
                  <option value="完了">完了</option>
                  <option value="途中">途中</option>
                  <option value="未完了">未完了</option>
                </Select>
              </Flex>
            </FormControl>
            <Flex justifyContent="right">
              <SButton bg="blue" onClick={() => onClickReturnButton()}>
                戻る
              </SButton>
              <SButton bg="blue" onClick={() => onClickUpdateButton()}>
                保存
              </SButton>
            </Flex>
          </Stack>
        </Flex>
      )}
    </Box>
  );
};

export default EditPage;
