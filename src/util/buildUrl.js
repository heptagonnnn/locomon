

export function buildUrl(url, params) {
  if (!params) {
    return url;
  }

  let query = '';
  if (params instanceof URLSearchParams) {
    const tmp = [];
    for (const pair of params.entries()) {
      tmp.push(`${pair[0]}=${pair[1]}`)
    }

    query = tmp.join("&");
  } else {
    query = Object.keys(params).map(key => {
      return `${key}=${params[key]}`
    }).join("&");
  }


  if (url.indexOf("#") !== -1) {
    url = url.split("#")[0];
  }

  if (url.indexOf("?") !== -1) {
    return `${url}&${query}`
  } else {
    return `${url}?${query}`;
  }
}