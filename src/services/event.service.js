import Event from '@/models/event';
import axios from 'axios';

class EventService {
  /**
   * Base url for events
   */
  static BASE_URL = '/events';

  /**
   * Get the list of events
   * @returns {Promise<Event[]>} the events
   */
  static async getEvents() {
    return axios
      .get(this.BASE_URL)
      .then(res => res.data)
      .then(events => events.map(Event.create));
  }

  /**
   * Post a new event
   * @param {Event} event the event to post
   * @returns {Promise<Event>} the posted event
   */
  static async postEvent(event) {
    return axios
      .post(this.BASE_URL, event, { admin: true })
      .then(res => res.data)
      .then(Event.create);
  }

  /**
   * Edit an event
   * @param {Event} event the event to edit
   * @returns {Promise<Event>} the edited event
   */
  static async editEvent(event) {
    return axios
      .put(`${this.BASE_URL}/${event.id}`, event, { admin: true })
      .then(res => res.data)
      .then(Event.create);
  }

  /**
   * Delete an event
   * @param {Event} event the event to delete
   * @returns {Promise} the deleted event
   */
  static async deleteEvent(event) {
    return axios.delete(`${this.BASE_URL}/${event.id}`, { admin: true });
  }
}

export default EventService;
