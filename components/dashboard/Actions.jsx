import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from '@chakra-ui/react';
import { MdMoreHoriz } from 'react-icons/md';

const Action = ({ label, icon, onClick, isLast, color }) => (
  <Tooltip hasArrow label={label}>
    <Button onClick={onClick} mr={isLast ? 0 : 3} my={2} colorScheme={color}>
      {icon}
    </Button>
  </Tooltip>
);

const Actions = ({ element, callback, modals }) => (
  <Flex wrap="nowrap">
    <Action label="Voir" icon={<ViewIcon />} onClick={() => callback(element, modals.show)} />
    <Action label="Éditer" icon={<EditIcon />} onClick={() => callback(element, modals.edit)} />
    <Action
      label="Supprimer"
      icon={<DeleteIcon />}
      onClick={() => callback(element, modals.delete)}
      color="red"
      isLast
    />
  </Flex>
);

const ResponsiveActions = ({ isDesktop, element, callback, modals }) =>
  isDesktop ? (
    <Actions element={element} callback={callback} modals={modals} />
  ) : (
    <Popover>
      <PopoverTrigger>
        <Button>
          <MdMoreHoriz />
        </Button>
      </PopoverTrigger>
      <PopoverContent width="auto">
        <PopoverArrow />
        <PopoverBody>
          <Actions element={element} callback={callback} modals={modals} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );

export default ResponsiveActions;
