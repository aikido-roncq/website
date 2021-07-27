import { AddIcon } from '@chakra-ui/icons';
import { Button, Flex, forwardRef, Text } from '@chakra-ui/react';
import { useState } from 'react';

const FileInput = ({ name, label, accept, children, ...props }, ref) => {
  const [currentFile, setCurrentFile] = useState(null);
  const [fileInput, setFileInput] = useState(null);

  const createRef = input => {
    setFileInput(input);
    return ref(input);
  };

  const handleButtonClick = () => fileInput.click();

  const handleFileSelect = e => {
    const file = e.target.files[0];
    setCurrentFile(file);
  };

  return (
    <Flex alignItems="center" {...props}>
      <Button onClick={handleButtonClick} leftIcon={<AddIcon />}>
        {label}
      </Button>
      <input
        type="file"
        name={name}
        accept={accept}
        ref={createRef}
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />
      <Text ml={3} fontSize="sm">
        {currentFile?.name || 'Aucun fichier sélectionné'}
      </Text>
    </Flex>
  );
};

export default forwardRef(FileInput);
