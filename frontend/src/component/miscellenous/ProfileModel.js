import { ViewIcon } from "@chakra-ui/icons";
import { Button, IconButton, useDisclosure } from "@chakra-ui/react";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
// import { ChatState } from "../../Context/chatprovider";

const ProfileModel = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
     console.log("profile model");
    console.log(user)
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}
      <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
        <ModalOverlay />
        <ModalContent height="400px">
          <ModalHeader
            fontSize="40px"
            display="flex"
            justifyContent="center"
            fontStyle="Work-sens"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexDir="column"
          >
            <Image
              borderRadius="10px"
              src={user.pic}
              alt={user.name}
              boxSize="150px"
            />
            <Text fontSize={{ base: "28px", md: "20px" }} fontStyle="Work-sens">
              Email : {user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModel;
