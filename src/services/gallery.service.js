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
}

export default GalleryService;
