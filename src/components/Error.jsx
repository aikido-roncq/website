import { Alert, AlertDescription, AlertIcon } from '@chakra-ui/react';

const Error = ({ children, ...props }) => (
  <Alert status="error" {...props}>
    <AlertIcon />
    <AlertDescription>{children}</AlertDescription>
  </Alert>
);

export default Error;
