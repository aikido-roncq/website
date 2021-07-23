import { relativeDateString } from '@/utils/date';

class Article {
  /**
   * Create a new article from an article object
   * @param {Object} article the article object
   */
  constructor(article) {
    Object.assign(this, article);
    this.relativeDate = relativeDateString(new Date(article.date));
  }

  /**
   * Static method to create a new article
   */
  static create(article) {
    return new Article(article);
  }
}

export default Article;
