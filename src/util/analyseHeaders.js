

/** analyseHeaders
 * @description
 *  format key "headers" to Headers Object
 * @param config
 */
export function analyseHeaders (config) {
  if (!config.headers) {
    return config;
  }



  const {headers} =  config;


  if (typeof headers !== "object") {
    throw new Error("invalid headers");
  }

  let resHeaders;
  if (!(headers instanceof Headers)) {
    resHeaders = new Headers();
    Object.keys(headers).forEach((header) => {
      res_headers.append(header, headers[headers]);
    });
  }

  resHeaders = headers;


  config.headers = resHeaders;
}