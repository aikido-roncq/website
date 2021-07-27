import { DeleteIcon } from '@chakra-ui/icons';
import {
  Flex,
  useBoolean,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverFooter,
  Button,
  PopoverArrow,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import Image from '../Image';

const ImageCard = ({ image, onDelete }) => {
  const [isHovered, setIsHovered] = useBoolean(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  const handleMouseLeave = () => {
    if (!isOpen) {
      setIsHovered.off();
    }
  };

  const handleClose = () => {
    setIsHovered.off();
    onClose();
  };

  const handleDelete = async () => {
    setDeleting(true);
    const deleted = await onDelete(image);
    if (deleted) {
      onClose();
      toast({
        status: 'success',
        title: 'Image supprimée avec succès',
        isClosable: true,
      });
    } else {
      toast({
        status: 'success',
        title: 'Image non supprimée',
        description: 'Une erreur est survenue. Veuillez réessayer plus tard',
        isClosable: true,
      });
    }
    setDeleting(false);
  };

  return (
    <Flex
      style={{ position: 'relative' }}
      direction="column"
      alignItems="center"
      justifyContent="center"
      onMouseOver={setIsHovered.on}
      onMouseLeave={handleMouseLeave}
      mt={4}
    >
      <Image
        src={image.fullSrc}
        caption={image.caption}
        style={{ filter: `brightness(${isHovered ? 0.5 : 1})`, margin: 0 }}
      />
      <Popover isOpen={isOpen} onOpen={onOpen} onClose={handleClose}>
        <PopoverTrigger>
          <IconButton
            style={{ position: 'absolute' }}
            icon={<DeleteIcon />}
            colorScheme="red"
            opacity={isHovered ? 1 : 0}
            rounded={5}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>Supprimer ? Cette action est irréversible.</PopoverHeader>
          <PopoverFooter>
            <Button onClick={onClose} mr={2}>
              Annuler
            </Button>
            <Button colorScheme="red" onClick={handleDelete} isLoading={deleting}>
              Supprimer
            </Button>
          </PopoverFooter>
          <PopoverArrow />
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default ImageCard;
