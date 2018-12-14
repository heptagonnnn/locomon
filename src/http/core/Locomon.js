import {defaultStatusValidation} from "../util/statusValidation";
import LocomonError from "./LocomonError";


export default class Locomon {


  static onSuccess = (res) => {
    return res;
  };


  static setup(settings) {
    const {defaultConfig, onError, onSuccess} = settings;
    Object.keys(defaultConfig).forEach((key) => {
      if (key === "default") {
        this.setDefaultConfig(defaultConfig[key]);
      } else {
        this.setDefaultConfig(key, defaultConfig[key]);
      }
    });
    this.onError = onError;
    this.onSuccess = onSuccess;
  }


  static setDefaultConfig(method, config) {
    if (typeof method === "object") {
      [method, config] = ["", method];
    }


    if (!method) {
      this.defaultConfig = config;
    } else {
      this[`default${method.toUpperCase()}Config`] = config;
    }
    console.log(this[`default${method.toUpperCase()}Config`]);
  }

  static getDefaultConfig(method = "") {
    if (typeof method !== "string") {
      throw new Error("invalid method");
    }
    return this[`default${method.toUpperCase()}Config`];
  }


  static request(url, config = this.defaultConfig || {}, rule = {}) {
    const {params, method = "get", data = {}} = config;


    if (method.toLowerCase() !== "get") {
      try {
        config.body = JSON.stringify(data);
      } catch (err) {
        const errorMessage = "invalid data, error in json stringify";
        console.error(errorMessage);
        throw new Error(err);
      }
    }


    const {statusValidation = defaultStatusValidation} = rule;


    return fetch(url, config)
      .then(async res => {
        const {status} = res;
        if (!statusValidation(status)) {
          const errorBody = await res.text();
          throw new LocomonError(status, `${status} error`, {
            status, body: errorBody
          });
        }
        const body = await res.json();

        this.onSuccess({status, body});
      })
      .catch(err => {
        console.log(this.onError);
        this.onError(err);
      });
  }


  static get(url, config = this.defaultGETConfig || {}, rule) {
    config.method = "get";
    return this.request(url, config, rule);
  }


  static post(url, config = this.defaultPOSTConfig || {}, rule) {
    config.method = "post";
    return this.request(url, config, rule);
  }
}