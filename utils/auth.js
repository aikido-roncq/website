import Cookies from 'js-cookie'
import { TOKEN_DURATION, TOKEN_KEY } from './constants'

class Auth {
  /**
   * @returns {String}
   */
  static get token() {
    return Cookies.get(TOKEN_KEY)
  }

  /**
   * @param {String} token
   */
  static saveToken(token) {
    Cookies.set(TOKEN_KEY, token, { expires: TOKEN_DURATION })
  }

  static clearToken() {
    Cookies.remove(TOKEN_KEY)
  }
}

export default Auth
