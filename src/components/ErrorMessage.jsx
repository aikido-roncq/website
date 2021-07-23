import { WarningTwoIcon } from '@chakra-ui/icons';

const ErrorMessage = ({ error }) => {
  if (!error) {
    return null;
  }

  return (
    <small style={{ color: 'red' }}>
      <WarningTwoIcon /> {error.message}
    </small>
  );
};

export default ErrorMessage;
