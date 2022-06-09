import { ARTICLES_SAVE_TOTAL_PAGES, SHOW_CONNECTION_ERROR, SHOW_LOADER } from '../reduxTypes';

export function saveTotalPages(pages) {
  return { type: ARTICLES_SAVE_TOTAL_PAGES, payload: pages };
}

export function showLoader(visible = true) {
  return { type: SHOW_LOADER, payload: visible };
}

export function showConnectionError() {
  return { type: SHOW_CONNECTION_ERROR };
}
