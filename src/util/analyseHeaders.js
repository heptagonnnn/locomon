/** analyseHeaders
 * @description
 *  format key "headers" to Headers Object
 * @param config
 */
export function analyseHeaders(config) {
  if (!config.headers) {
    return config;
  }


  const {headers} = config;


  if (typeof headers !== "object") {
    throw new Error("invalid headers");
  }

  let resHeaders;
  if (!(headers instanceof Headers)) {
    try {
      resHeaders = new Headers();
      Object.keys(headers).forEach((header) => {
        resHeaders.append(header, headers[header]);
      });
    } catch (err) {
      console.error(err);
      throw new Error("invalid headers");
    }
  }

  config.headers = resHeaders;
  return config
}