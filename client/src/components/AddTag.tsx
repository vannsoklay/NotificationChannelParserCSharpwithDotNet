import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const AddTag = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let data = JSON.stringify(text);
    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: "http://localhost:5062/api/notification/tag",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((_) => {
        onClose();
        toast.success('Successfully to add tag!')
      })
      .catch((_) => {
        toast.error('Invalid to add tag')
      });
  };

  return (
    <>
      <Button color="primary" variant="solid" onPress={onOpen}>
        Add Tag
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">Add Tag</ModalHeader>
              <ModalBody>
                <div>
                  <Input
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                    size="lg"
                    placeholder="Write tag for notification channel"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Add
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
