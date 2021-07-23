class Event {
  /**
   * Create a new event from an event object
   * @param {Object} event the event object
   */
  constructor(event) {
    Object.assign(this, event);
  }

  /**
   * Static method to create a new event
   */
  static create(event) {
    return new Event(event);
  }
}

export default Event;
