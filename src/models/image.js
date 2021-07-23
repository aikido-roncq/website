/**
 * Represent a gallery image
 */
class Image {
  /**
   * Create a new image from an image object
   * @param {Object} image the image object
   */
  constructor(image) {
    Object.assign(this, image);
  }

  /**
   * Static method to create a new image
   */
  static create(image) {
    return new Image(image);
  }
}

export default Image;
