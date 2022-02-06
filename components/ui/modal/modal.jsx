import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import SButton from "../button/base-button";

const SModal = (props) => {
  const { isOpen, onClose, signOut } = props;
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>Are you sure you want to logout?</ModalBody>
          <ModalCloseButton />
          <ModalFooter>
            <SButton bg="blue" onClick={onClose}>
              Cancel
            </SButton>
            <SButton bg="red" onClick={signOut}>
              OK
            </SButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SModal;
