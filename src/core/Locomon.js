import LocomonError from "./LocomonError";
import {buildUrl} from "../util/buildUrl";
import {analyseHeaders} from "../util/analyseHeaders";
import {DEFAULT_SETTINGS} from "../const/DEFAULT_SETTINGS";


export default class Locomon {


  // 默认config

  static defaultConfig = {};


  static defaultSettings = DEFAULT_SETTINGS;


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


  /**
   * 总的原则
   * settings中使用除去config以外的设置，具体请求中的settings会覆盖默认settings中对应的字段
   * config使用Object.assign进行覆盖，具体请求中的settings会与默认config合并，相同字段覆盖
   */
  static request(url, config = {}, settings = this.defaultSettings) {



    // 默认get请求
    const {method = "get"} = config;

    config = {...this.defaultConfig, ...(this[`default${method.toUpperCase()}Config`] || {}), ...config};
    const {params, data} = config;

    // headersformat和analysis

   config = analyseHeaders(config);


    // 参数部分
    if (method.toLowerCase() !== "get") {
      if (!config.headers || config.headers && config.headers.get("content-type") !== "application/json") {
        config.body = data;
      } else {
        try {
          config.body = JSON.stringify(data);
        } catch (err) {
          const errorMessage = "invalid data, error in json stringify";
          console.error(errorMessage);
          throw new Error(err);
        }
      }
    } else {
      url = buildUrl(url, params);
    }


    if (settings !== this.defaultSettings) {
      settings = {...this.defaultSettings, ...settings};
    }
    // status校验
    const {statusValidation, onSuccess, onError} = settings;


    return fetch(url, config)
      .then(async res => {
        const {status} = res;
        if (!statusValidation(status)) {
          const errorBody = await res.text();
          throw new LocomonError(status, {
            status, body: errorBody
          });
        }
        const body = await res.json();

        return onSuccess({status, body});
      }).catch(err => {
        onError(err);
      });
  }


  static get(url, config = {}, settings) {
    config.method = "get";
    return this.request(url, config, settings);
  }


  static post(url, config = {}, settings) {
    config.method = "post";
    return this.request(url, config, settings);
  }

}