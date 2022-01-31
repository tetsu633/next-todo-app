import Link from "next/link";

import { Button } from "@chakra-ui/react";

const EditButton = ({ children, todoId }) => {
  return (
    <Link href={`/${todoId}/edit`}>
      <Button bg="blue.100" _hover={{ bg: "blue.300" }}>
        {children}
      </Button>
    </Link>
  );
};

export default EditButton;
