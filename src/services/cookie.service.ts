// CookieService.ts
import * as cookie from 'cookie';

class CookieService {
  set(name: string, value: string, options = {}) {
    options = {
        path: '/',
        };
    document.cookie = cookie.serialize(name, value, options);
  }

  get(name: string) {
    const cookies = cookie.parse(document.cookie);
    return cookies[name];
  }
}

export default new CookieService();