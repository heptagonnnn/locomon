import {defaultStatusValidation} from "../util/statusValidation";
import LocomonError from "./LocomonError";
import {buildUrl} from "../util/buildUrl";


export default class Locomon {


  static defaultSettings = {
    statusValidation: defaultStatusValidation,
    onSuccess(res) {
      return res;
    },
    onError(LocomonError) {
      throw LocomonError;
    },
    defaultConfig: {}
  };


  static setup(settings) {
    const {defaultConfig} = Object.assign(this.defaultSettings, settings);


    // 为对应method设置config
    Object.keys(defaultConfig).forEach((key) => {
      if (key === "default") {
        this.setDefaultConfig(defaultConfig[key]);
      } else {
        this.setDefaultConfig(key, defaultConfig[key]);
      }
    });
  }


  static setDefaultConfig(method, config) {

    if (typeof method === "object") {
      [method, config] = ["", method];
    }

    // 根据method设置默认参数
    this[`default${method.toUpperCase()}Config`] = config;
  }

  static getDefaultConfig(method = "") {
    if (typeof method !== "string") {
      throw new Error("invalid method");
    }
    return this[`default${method.toUpperCase()}Config`];
  }





  static request(url, config = {}, settings = this.defaultSettings) {
    // 默认get请求
    const {params, method = "get", data = {}} = config;


    // 参数部分
    if (method.toLowerCase() !== "get") {
      try {
        config.body = JSON.stringify(data);
      } catch (err) {
        const errorMessage = "invalid data, error in json stringify";
        console.error(errorMessage);
        throw new Error(err);
      }
    } else {
      url = buildUrl(url, params);
    }



    // status校验
    const {statusValidation, onSuccess, onError} = {...this.defaultSettings, ...settings};


    return fetch(url, config)
      .then(async res => {
        console.log(res);
        const {status} = res;
        if (!statusValidation(status)) {
          const errorBody = await res.text();
          throw new LocomonError(status, `${status} error`, {
            status, body: errorBody
          });
        }
        const body = await res.json();

        onSuccess({status, body});
      })
      .catch(err => {
        console.log(err);
        console.log(onError);
        onError(err);
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