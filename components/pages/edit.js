import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";

import { db } from "../../firebase";
import { updateDoc, doc } from "firebase/firestore";
import AppContext from "../../store/context";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  VStack,
  Input,
  Select,
  Textarea,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import Header from "../header";
import ReturnButton from "../button/return-button";
import SaveButton from "../button/save-button";

const Edit = () => {
  const { todos } = useContext(AppContext);
  const [todo, setTodo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const todoId = router.query.id.shift();
    const index = todos.findIndex((todo) => todo.id === Number(todoId));
    setTodo(todos[index]);
  }, []);

  // 保存ボタン押下時の処理
  const onClickUpdateButton = async (e) => {
    e.preventDefault();

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
  const onClickReturnButton = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <Box>
      <Header />
      {todo !== undefined && todo !== null && (
        <VStack spacing={4}>
          <FormControl>
            <Flex px={16}>
              <FormLabel w={16} htmlFor="title">
                Title
              </FormLabel>
              <Input
                id="title"
                type="text"
                value={todo.title}
                onChange={(e) => setTodo({ ...todo, title: e.target.value })}
              />
            </Flex>
          </FormControl>
          <FormControl>
            <Flex px={16}>
              <FormLabel w={16} htmlFor="detail">
                Detail
              </FormLabel>
              <Textarea
                id="detail"
                value={todo.detail}
                onChange={(e) => setTodo({ ...todo, detail: e.target.value })}
              />
            </Flex>
          </FormControl>
          <FormControl>
            <Flex px={16}>
              <FormLabel w={16}>Status</FormLabel>
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
          <HStack>
            <ReturnButton onClickEvent={(e) => onClickReturnButton(e)}>
              戻る
            </ReturnButton>
            <Spacer />
            <SaveButton onClickEvent={(e) => onClickUpdateButton(e)}>
              保存
            </SaveButton>
          </HStack>
        </VStack>
      )}
    </Box>
  );
};

export default Edit;
