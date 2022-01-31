import Link from "next/link";

import { Button } from "@chakra-ui/react";

const DetailButton = ({ children, todoId }) => {
  return (
    <Link href={`/${todoId}/`}>
      <Button bg="green.100" _hover={{ bg: "green.300" }}>
        {children}
      </Button>
    </Link>
  );
};

export default DetailButton;
