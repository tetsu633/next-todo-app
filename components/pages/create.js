import { useRouter } from "next/router";
import { useContext, useState } from "react";

import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
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
import AppContext from "../../store/context";

const CreatePage = () => {
  const { currentUser } = useContext(AppContext);
  const [todo, setTodo] = useState({
    title: "",
    detail: "",
    status: "未完了",
    userId: null,
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

    const newTodo = { ...todo, id: lastId + 1, userId: currentUser.uid };
    await addDoc(collection(db, "todos"), newTodo)
      .then(router.push("/"))
      .catch((e) => {
        console.log(e);
      });
  };

  // 戻るボタン押下時の処理
  const onClickReturnButton = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <Box maxH={"100vh"}>
      <Header />
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
            <SButton bg="blue" onClick={(e) => onClickReturnButton(e)}>
              戻る
            </SButton>
            <SButton bg="blue" onClick={(e) => onClickAddButton(e)}>
              保存
            </SButton>
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
};

export default CreatePage;
