






export function mergeConfig (config1 = {}, config2 = {}) {
  if (typeof config1 !== "object" && typeof config2 !== "object") {
    console.error("config参数不合法");
    throw new Error("config参数不合法");
  }

  const config = Object.assign({}, config1, config2);

  return config;
}