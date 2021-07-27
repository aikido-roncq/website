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

  /**
   * Get the full src of the image, which means the base api url concatenated with the image src
   * @return {String} the full src
   */
  get fullSrc() {
    return `${process.env.API_URL}/${this.src}`;
  }
}

export default Image;
