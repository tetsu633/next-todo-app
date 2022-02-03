import { FormLabel } from "@chakra-ui/react";

const SFormLabel = (props) => {
  const { children, htmlFor } = props;

  return (
    <FormLabel w={16} htmlFor={htmlFor !== undefined && htmlFor}>
      {children}
    </FormLabel>
  );
};

export default SFormLabel;
