import GalleryService from '@/services/gallery.service';
import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ImageCard from './ImageCard';
import AddImage from './modals/AddImage';

const Gallery = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const columns = useBreakpointValue({ base: 1, sm: 2, lg: 4 });
  const [images, setImages] = useState([]);

  const addImageModal = useDisclosure();

  const addImage = async data => {
    let image;

    try {
      image = await GalleryService.postImage(data);
    } catch {
      return false;
    }

    setImages(oldImages => [...oldImages, image]);
    return true;
  };

  const deleteImage = async image => {
    try {
      await GalleryService.deleteImage(image);
    } catch {
      return false;
    }

    setImages(oldImages => oldImages.filter(i => i.id !== image.id));
    return true;
  };

  useEffect(() => {
    GalleryService.getGallery()
      .then(setImages)
      .catch(() => {});
  }, []);

  return (
    <Box>
      <Flex alignItems="baseline" direction={isDesktop ? 'row' : 'column'}>
        <Heading as="h2" size="lg" mb={4} mr={4}>
          📸 Galerie
        </Heading>
        <Button onClick={addImageModal.onOpen} mb={2}>
          <AddIcon mr={3} /> Ajouter une image
        </Button>
      </Flex>

      <SimpleGrid columns={columns} spacing={columns}>
        {images.map((image, index) => (
          <ImageCard image={image} key={index} onDelete={deleteImage} />
        ))}
      </SimpleGrid>

      {images.length == 0 && <Text>Aucune image</Text>}

      {/* Modals */}
      <AddImage
        isOpen={addImageModal.isOpen}
        onClose={addImageModal.onClose}
        submitCallback={addImage}
      />
    </Box>
  );
};

export default Gallery;
