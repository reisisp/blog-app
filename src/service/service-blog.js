export default class BlogService {
  _apiBase = 'https://kata.academy:8021/api';

  async getRes(str = '', data = {}, method = 'GET', delArt = false) {
    const token = localStorage.getItem('token') === null ? '' : localStorage.getItem('token');
    const auth = token ? { Authorization: 'Bearer ' + token } : {};
    const body = Object.keys(data).length ? { body: JSON.stringify(data) } : {};

    const res = await fetch(`${this._apiBase}${str}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...auth,
      },
      method: method,
      ...body,
    });
    if (!res.ok) {
      if (res.status === 422) {
        return await res.json();
      } else {
        throw new Error(`Could not fetch url: ${res.status}`);
      }
    }
    if (res.ok && method === 'DELETE' && delArt) return res.ok;
    if (res.ok) return await res.json();
  }

  getArticlesByPage(page) {
    const offset = page * 10;
    const limit = 10;
    return this.getRes(`/articles?limit=${limit}&offset=${offset}`, {}, 'GET');
  }

  getArticleBySlug(slug) {
    return this.getRes(`/articles/${slug}`, {}, 'GET');
  }

  registerUser(user) {
    const data = {
      user: { ...user },
    };
    return this.getRes('/users', data, 'POST');
  }

  login(user) {
    const data = {
      user: { ...user },
    };
    return this.getRes('/users/login', data, 'POST');
  }

  getCurrentUser() {
    return this.getRes('/user', {}, 'GET');
  }

  updateUser(user) {
    const data = {
      user: { ...user },
    };
    return this.getRes('/user', data, 'PUT');
  }

  createArticle(article) {
    const data = { article: { ...article } };
    return this.getRes('/articles', data, 'POST');
  }

  deleteArticle(slug) {
    return this.getRes(`/articles/${slug}`, {}, 'DELETE', true);
  }

  updateArticle(slug, article) {
    const data = { article: { ...article } };
    return this.getRes(`/articles/${slug}`, data, 'PUT');
  }

  setFavorite(slug) {
    return this.getRes(`/articles/${slug}/favorite`, {}, 'POST');
  }

  removeFavorite(slug) {
    return this.getRes(`/articles/${slug}/favorite`, {}, 'DELETE');
  }
}
