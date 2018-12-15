function proxy () {
  return {
    "/theSound/*": {
      changeOrigin: true,
      secure: false,
      target: "http://hybrid.test.ximalaya.com"
    },
    "/xmcaptcha-service/*": {
      changeOrigin: true,
      secure: false,
      target: "http://hybrid.test.ximalaya.com"
    }
  };
}


module.exports = proxy;