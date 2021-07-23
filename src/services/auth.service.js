import axios from 'axios';

class AuthService {
  /**
   * Login the user with the given credentials
   * @returns {Promise<String>} the token
   */
  static async login(username, password) {
    return axios({
      url: '/login',
      method: 'POST',
      auth: {
        username,
        password,
      },
    }).then(res => res.data.token);
  }

  /**
   * Logout the user
   * @returns {Promise}
   */
  static async logout() {
    return axios({ method: 'POST', url: '/logout' }, { admin: true });
  }

  /**
   * Verify that the given token is valid
   * @param {string} token the token to validate
   * @returns {Promise}
   */
  static async validate(token) {
    return axios.get('/validate', { headers: { authorization: `Bearer ${token}` } });
  }
}

export default AuthService;
