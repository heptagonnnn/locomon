import {GooseError} from "../common/GooseError";



const METHOD_WHITE_LIST = [
  "get", "post"
];


const DEFAULT_POST_HEADER = {
  "content-type": "application/json"
};

export default class BaseFetch {



  static request(url, config = {}, resetConfig) {
    let {method = "GET"} = config;
    method = method.toLowerCase();
    if (METHOD_WHITE_LIST.indexOf(method) > -1) {
      return this[method](url, config, resetConfig);
    } else {
     return this.fetchFactory(url, config);
    }
  }

  static get(url, config) {
    if (typeof config.body === "object" && JSON.stringify(config.body) !== "{}") {
      let query;
      for (const i in config.body) {
        query += `${i}=${config.body[i]}`;
      }
      url = `${url}?${query}`;
      delete config.body;
    }
    return this.fetchFactory(url, config);
  }

  static post(url, config, resetConfig) {
    let realConfig;
    if (resetConfig) {
      realConfig = config;
    } else {
      const headers = {...DEFAULT_POST_HEADER, ...config.headers};
      realConfig = {...config, headers};
    }
    return this.fetchFactory(url, realConfig);
  }



  static fetchFactory(url, config) {
    return fetch(url, config)
      .then(this.resParse)
      .catch(err => {
        console.log(err);
        throw new err;
      });
  }

  static async resParse(res) {
    const status = res.status;
    const body = await res.json();
    const gooseRes = {
      status, body
    };
    if (status >= 400) {
      throw new GooseError("server error", gooseRes);
    }

    return gooseRes;
  }


  static bodyParse(body) {
    let tmp;
    try {
      tmp = JSON.stringify(true_config.body);
    } catch (err) {
      throw new GooseError(`body stringify error: ${err.message}`)
    }
  }


}