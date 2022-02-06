import { FormLabel } from "@chakra-ui/react";

const SFormLabel = (props) => {
  const { children, htmlFor } = props;

  return (
    <>
      {htmlFor !== undefined ? (
        <FormLabel w={16} htmlFor={htmlFor}>
          {children}
        </FormLabel>
      ) : (
        <FormLabel w={16}>{children}</FormLabel>
      )}
    </>
  );
};

export default SFormLabel;
