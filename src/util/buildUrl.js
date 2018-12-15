import {isEmptyObject} from "./common";


export function buildUrl(url, params) {
  if (!params || isEmptyObject(params)) {
    return url;
  }

  const query = Object.keys(params).map(key => {
    return `${key}=${params[key]}`
  }).join("&");

  return `${url}?${query}`;
}