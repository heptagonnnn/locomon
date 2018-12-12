const argv = require("yargs").argv;


function detectEnv() {
  const __ENV__ = {};
  if (argv.prod) {
    __ENV__.prod = true;
  } else if (argv.test) {
    __ENV__.test = true;
  } else {
    __ENV__.dev = true;
  }
  console.log("environment detect", __ENV__);
  return __ENV__;
}



exports.detectEnv = detectEnv;