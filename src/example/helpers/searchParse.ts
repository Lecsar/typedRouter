import {parse} from 'qs';

/** Нормализация строки запроса */
export function normalizeSearch(search?: string) {
  if (typeof search === 'string') {
    return search.replace('?', '');
  }
  return '';
}

/** Парсинг строки запроса в объект*/
export function searchParse(search?: string) {
  return parse(normalizeSearch(search));
}
