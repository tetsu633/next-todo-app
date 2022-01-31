import { Button } from "@chakra-ui/react";

const DeleteButton = ({ children, onClickEvent }) => {
  return (
    <Button bg="red.100" _hover={{ bg: "red.300" }} onClick={onClickEvent}>
      {children}
    </Button>
  );
};

export default DeleteButton;
