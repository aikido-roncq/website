import Article from '@/models/article';
import axios from 'axios';

class ArticleService {
  /**
   * Base url for articles
   */
  static BASE_URL = '/articles';

  /**
   * Get the list of articles
   * @returns {Promise<Article[]>} the list of articles
   */
  static async getArticles(limit) {
    return axios
      .get(this.BASE_URL)
      .then(res => res.data)
      .then(articles => articles.slice(0, limit))
      .then(articles => articles.map(Article.create));
  }

  /**
   * Post a new article
   * @param {Article} article the article to post
   * @returns {Promise<Article>} the created article
   */
  static async postArticle(article) {
    return axios
      .post(this.BASE_URL, article, { admin: true })
      .then(res => res.data)
      .then(Article.create);
  }

  /**
   * Edit an article
   * @param {Article} article the article to edit
   * @returns {Promise<Article>} the edited article
   */
  static async editArticle(article) {
    return axios
      .put(`${this.BASE_URL}/${article.id}`, article, { admin: true })
      .then(res => res.data)
      .then(Article.create);
  }

  /**
   * Delete an article
   * @param {Article} article the article to delete
   * @returns {Promise} the deleted article
   */
  static async deleteArticle(article) {
    return axios.delete(`${this.BASE_URL}/${article.id}`, { admin: true });
  }
}

export default ArticleService;
