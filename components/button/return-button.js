import { Button } from "@chakra-ui/react";

const ReturnButton = ({ children, onClickEvent }) => {
  return (
    <Button bg="blue.100" _hover={{ bg: "blue.300" }} onClick={onClickEvent}>
      {children}
    </Button>
  );
};

export default ReturnButton;
