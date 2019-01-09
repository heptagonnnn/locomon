function proxy () {
  return {
    "/bgupload/*": {
      target: "http://ops.test.ximalaya.com",
      changeOrigin: true,
      secure: false,
    }
  };
}


module.exports = proxy;