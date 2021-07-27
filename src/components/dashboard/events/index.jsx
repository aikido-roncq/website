import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import DeleteEvent from './modals/DeleteEvent';
import AddEvent from './modals/AddEvent';
import ViewEvent from './modals/ViewEvent';
import { formatDateRange } from '@/utils/date';
import Actions from '../Actions';
import EventService from '@/services/event.service';

const Events = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const [currentEvent, setCurrentEvent] = useState(null);
  const [events, setEvents] = useState([]);

  const addEventModal = useDisclosure();
  const viewEventModal = useDisclosure();
  const deleteEventModal = useDisclosure();

  useEffect(() => {
    EventService.getEvents().then(setEvents);
  }, []);

  const handleClick = (event, modal) => {
    setCurrentEvent(event);
    modal.onOpen();
  };

  const addEvent = async event => {
    try {
      await EventService.postEvent(event);
    } catch {
      return false;
    }

    setEvents(await EventService.getEvents());
    return true;
  };

  const editEvent = async event => {
    let editedEvent;

    try {
      editedEvent = await EventService.editEvent(event);
    } catch {
      return false;
    }

    const eventIndex = events.findIndex(e => e.id === event.id);
    const newEvents = [...events];
    newEvents[eventIndex] = editedEvent;

    setEvents(newEvents);
    return true;
  };

  const deleteEvent = async event => {
    try {
      await EventService.deleteEvent(event);
    } catch {
      return false;
    }

    setEvents(oldEvents => oldEvents.filter(e => e.id !== event.id));
    return true;
  };

  return (
    <Box>
      <Flex alignItems="baseline" direction={isDesktop ? 'row' : 'column'}>
        <Heading as="h2" size="lg" mb={4} mr={4}>
          📅 Événements
        </Heading>
        <Button onClick={() => handleClick(null, addEventModal)} mb={2}>
          <AddIcon mr={3} /> Ajouter un événement
        </Button>
      </Flex>
      <Table size="md" overflowY="scroll">
        <Thead>
          <Tr>
            <Th>Titre</Th>
            {isDesktop && <Th>Date</Th>}
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {events.map(event => (
            <Tr key={event.id} gridTemplateColumns="1fr auto auto">
              <Td>{event.title}</Td>
              {isDesktop && <Td>{formatDateRange(event.start_date, event.end_date)}</Td>}
              <Td>
                <Actions
                  element={event}
                  isDesktop={isDesktop}
                  callback={handleClick}
                  modals={{ show: viewEventModal, edit: addEventModal, delete: deleteEventModal }}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modals */}
      <AddEvent
        submitCallback={currentEvent ? editEvent : addEvent}
        onClose={addEventModal.onClose}
        isOpen={addEventModal.isOpen}
        event={currentEvent}
      />
      <ViewEvent
        isOpen={viewEventModal.isOpen}
        onClose={viewEventModal.onClose}
        event={currentEvent}
      />
      <DeleteEvent
        onConfirm={deleteEvent}
        isOpen={deleteEventModal.isOpen}
        onClose={deleteEventModal.onClose}
        event={currentEvent}
      />
    </Box>
  );
};

export default Events;
