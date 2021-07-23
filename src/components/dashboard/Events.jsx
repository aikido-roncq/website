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
  useToast,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DeleteEvent from './modals/events/DeleteEvent';
import AddEvent from './modals/events/AddEvent';
import ViewEvent from './modals/events/ViewEvent';
import { formatDateRange } from '@/utils/date';
import Actions from './Actions';

const Events = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const [currentEvent, setCurrentEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const toast = useToast();

  const addEventModal = useDisclosure();
  const viewEventModal = useDisclosure();
  const deleteEventModal = useDisclosure();

  useEffect(() => {
    axios.get('/events').then(res => setEvents(res.data));
  }, []);

  const handleClick = (event, modal) => {
    setCurrentEvent(event);
    modal.onOpen();
  };

  const handleAddButtonClick = () => {
    if (currentEvent) {
      setCurrentEvent(null);
    }
    addEventModal.onOpen();
  };

  const addEvent = async event => {
    try {
      await axios.post('/events', event, { admin: true });
    } catch (e) {
      toast({
        title: 'Événement non ajouté',
        description: "Une erreur est survenue lors de l'ajout de l'événément.",
        status: 'error',
        isClosable: true,
      });

      return false;
    }

    setEvents((await axios.get('/events')).data);

    addEventModal.onClose();

    toast({
      title: 'Événement ajouté',
      description: "L'événement a été ajouté avec succès !",
      status: 'success',
      isClosable: true,
    });

    return true;
  };

  const editEvent = async event => {
    try {
      await axios.put(`/events/${event.id}`, event, {
        admin: true,
      });
    } catch (e) {
      toast({
        title: 'Événement non mis à jour',
        description: "Une erreur est survenue lors de la mise à jour de l'événement.",
        status: 'error',
        isClosable: true,
      });

      return;
    }

    const eventIndex = events.findIndex(e => e.id === event.id);
    const newEvents = [...events];
    newEvents[eventIndex] = event;

    setEvents(newEvents);
    addEventModal.onClose();

    toast({
      title: 'Événément mis à jour',
      description: "L'événément a été mis à jour avec succès !",
      status: 'success',
      isClosable: true,
    });
  };

  const deleteEvent = async event => {
    try {
      await axios.delete(`/events/${event.id}`, { admin: true });
    } catch (e) {
      toast({
        title: 'Événement non supprimé',
        description: "Une erreur est survenue lors de la suppression de l'événément.",
        status: 'error',
        isClosable: true,
      });
      console.error(e);

      return;
    }

    setEvents(oldEvents => oldEvents.filter(e => e.id !== event.id));
    deleteEventModal.onClose();

    toast({
      title: 'Événement supprimé',
      description: "L'événement a été supprimé avec succès !",
      status: 'success',
      isClosable: true,
    });
  };

  return (
    <Box>
      <Flex alignItems="baseline" direction={isDesktop ? 'row' : 'column'}>
        <Heading as="h2" size="lg" mb={4} mr={4}>
          📅 Événements
        </Heading>
        <Button onClick={handleAddButtonClick} mb={2}>
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
