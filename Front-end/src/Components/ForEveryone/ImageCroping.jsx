import React from 'react';
import { useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react';

export default function ImageCroping() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const imageRef = useRef(null);

    return (
      <>
        <Button onClick={onOpen}>Open Modal</Button>
  
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
          <div className="w-full mx-auto p-4">
          <div className="w-1/2 h-auto mx-auto">
            <img ref={imageRef} alt="Crop" className="max-w-full" />
          </div>
          <div className="w-1/2 mx-auto mt-4">
            {selectedImage && (
              <div>
                <img src={selectedImage} alt="Cropped" className="max-w-full" />
              </div>
            )}
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => {
                console.log('hai', selectedImage);
                console.log(image);
                setImage(selectedImage);
                setDis(false)
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-full uppercase text-sm font-semibold tracking-wide"
            >
              ok
            </button>
          </div>
        </div>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
}
