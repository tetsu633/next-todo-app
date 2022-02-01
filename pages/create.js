import { useRouter } from "next/router";
import { useState } from "react";

import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Stack,
} from "@chakra-ui/react";
import Header from "../components/header";
import SButton from "../components/button/base-button";

// 作成画面
const CreateTodo = () => {
  const [todo, setTodo] = useState({
    title: "",
    detail: "",
    status: "未完了",
    term: "",
  });
  const router = useRouter();

  // 追加ボタン押下時の処理
  const onClickAddButton = async (e) => {
    e.preventDefault();

    // IDの最大値を取得
    const lastId = await getDocs(collection(db, "todos")).then((res) => {
      const id = res.docs.map((doc) => doc.data().id);
      return id.length !== 0 ? Math.max(...id) : 0;
    });

    const newTodo = { ...todo, id: lastId + 1 };
    try {
      await addDoc(collection(db, "todos"), newTodo)
        .then(router.push("/"))
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };

  // 戻るボタン押下時の処理
  const onClickReturnButton = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <Box>
      <Header />
      <Stack spacing={4}>
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
        <Flex justifyContent="right">
          <SButton bg="blue" onClick={(e) => onClickReturnButton(e)}>
            戻る
          </SButton>
          <SButton bg="blue" onClick={(e) => onClickAddButton(e)}>
            保存
          </SButton>
        </Flex>
      </Stack>
    </Box>
  );
};

export default CreateTodo;
