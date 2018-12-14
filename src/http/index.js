import {DEFAULT_CONFIG} from "./config";


function BaseFetch(url, config = {}, initialConfig = false) {
  const true_config = initialConfig ? {...config} : {...DEFAULT_CONFIG, ...config};

  if (true_config.body && true_config.method && true_config.method.toUpperCase() === "GET") {
    let query = [];
    for (let i in config.body) {
      if (config.body[i]) {
        query.push(`${i}=${config.body[i]}`);
      }
    }
    query = query.join("&");
    url += `?${query}`;
    true_config.params = "test=1";
    delete true_config.body;
  }


  if (true_config.body && true_config.method && true_config.method.toUpperCase() === "POST") {
    let tmp;
    try {
      tmp = JSON.stringify(true_config.body);
    } catch (err) {
      tmp = true_config.body;
    }
    true_config.body = tmp;
    const oldHeader = true_config.headers || {};
    true_config.headers = {"Content-Type": "application/json", ...oldHeader};
  }


  return fetch(`${url}`, true_config)
    .then(async (e) => {
      const body = await e.json();
      return {
        body,
        status: e.status
      }
    })
    .catch(err => {
      console.error(err.message);
      throw new Error(err.message);
    })
}


export {BaseFetch};