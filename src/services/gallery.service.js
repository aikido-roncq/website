import Image from '@/models/image';
import axios from 'axios';

class GalleryService {
  /**
   * Base url for gallery
   */
  static BASE_URL = '/gallery';

  /**
   * Get the gallery images
   * @return {Promise<Image>} the gallery images
   */
  static async getGallery() {
    return axios
      .get(this.BASE_URL)
      .then(res => res.data)
      .then(images => images.map(Image.create));
  }

  /**
   * Post a new image to the gallery
   * @param {Object} data the data containing the image to post
   * @param {String} data.image the image to post
   * @param {String} data.caption the caption of the image to post
   * @return {Promise<Image>} the new image
   */
  static async postImage(data) {
    const formData = new FormData();
    formData.append('image', data.image[0]);
    formData.append('caption', data.caption);

    return axios
      .post(this.BASE_URL, formData, { admin: true })
      .then(res => res.data)
      .then(Image.create);
  }

  /**
   * Delete an image from the gallery
   * @param {Image} image the image to delete
   */
  static async deleteImage(image) {
    return axios.delete(`${this.BASE_URL}/${image.id}`, { admin: true });
  }
}

export default GalleryService;
