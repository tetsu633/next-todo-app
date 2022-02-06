import { Button } from "@chakra-ui/react";

const SButton = (props) => {
  const { bg, onClick, children } = props;
  return (
    <Button
      w={"6rem"}
      mx={1}
      bg={`${bg}.100`}
      _hover={{ bg: `${bg}.300` }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default SButton;
