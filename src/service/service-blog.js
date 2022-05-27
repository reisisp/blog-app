export default class BlogService {
  _apiBase = 'https://kata.academy:8021/api';

  async getRes(str = '', data = {}, method = 'GET', token = '', delArt = false) {
    const auth = token ? { Authorization: 'Bearer ' + token } : {};
    const body = Object.keys(data).length ? { body: JSON.stringify(data) } : {};

    for (let count = 0; count < 5; count++) {
      const res = await fetch(`${this._apiBase}${str}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...auth,
        },
        method: method,
        ...body,
      });
      if (!res.ok && count === 4) {
        if (res.status === 422) {
          return await res.json();
        } else {
          throw new Error(`Could not fetch url: ${res.status}`);
        }
      }
      if (res.ok && method === 'DELETE' && delArt) return res.ok;
      if (res.ok) return await res.json();
    }
  }

  getArticlesByPage(page, token = '') {
    return this.getRes(`/articles?offset=${page}`, {}, 'GET', token);
  }

  getArticleBySlug(slug, token = '') {
    return this.getRes(`/articles/${slug}`, {}, 'GET', token);
  }

  registerUser(user) {
    const data = {
      user: {
        username: user.username,
        email: user.email,
        password: user.password,
      },
    };
    return this.getRes('/users', data, 'POST');
  }

  login(user) {
    const data = {
      user: { email: user.email, password: user.password },
    };
    return this.getRes('/users/login', data, 'POST');
  }

  getCurrentUser(token) {
    return this.getRes('/user', {}, 'GET', token);
  }

  updateUser(token, user) {
    const data = {
      user: {
        username: user.username,
        email: user.email,
        password: user.password,
        image: user.image,
      },
    };
    return this.getRes('/user', data, 'PUT', token);
  }

  createArticle(article, token) {
    const data = { article: { ...article } };
    return this.getRes('/articles', data, 'POST', token);
  }

  deleteArticle(slug, token) {
    return this.getRes(`/articles/${slug}`, {}, 'DELETE', token, true);
  }

  updateArticle(slug, article, token) {
    const data = { article: { ...article } };
    return this.getRes(`/articles/${slug}`, data, 'PUT', token);
  }

  setFavorite(slug, token) {
    return this.getRes(`/articles/${slug}/favorite`, {}, 'POST', token);
  }

  removeFavorite(slug, token) {
    return this.getRes(`/articles/${slug}/favorite`, {}, 'DELETE', token);
  }
}
