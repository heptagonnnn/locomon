import {defaultStatusValidation} from "../util/statusValidation";

export const DEFAULT_SETTINGS = {
  statusValidation: defaultStatusValidation,
  onSuccess(res) {
    return res;
  },
  onError(LocomonError) {
    throw LocomonError;
  },
  defaultConfig: {}
};