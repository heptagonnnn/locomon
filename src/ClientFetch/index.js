import BaseFetch from "../BaseFetch";


export default class ClientFetch extends BaseFetch {



  static request(url, config, resetConfig) {
    return super.request(url, config, resetConfig);
  }

  static get(url, config, resetConfig) {
    return super.get(url, config, resetConfig);
  }


  static post(url, config, resetConfig) {
    return super.post(url, config, resetConfig);
  }


  static handleSuccess() {

  }

  static handleError() {

  }
}