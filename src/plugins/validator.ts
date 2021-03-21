const BASE_URL = 'https://api.github.com/';

export function validateUrl(url: string) {
  const index = url.indexOf(BASE_URL);
  if (index >= 0) {
    return url;
  } else {
    return BASE_URL + url;
  }
}
