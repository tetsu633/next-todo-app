import Link from "next/link";

import { Button } from "@chakra-ui/react";

const CreateButton = ({ children, onClickEvent }) => {
  return (
    <Link href="/create">
      <Button bg="blue.100" _hover={{ bg: "blue.300" }} onClick={onClickEvent}>
        {children}
      </Button>
    </Link>
  );
};

export default CreateButton;
