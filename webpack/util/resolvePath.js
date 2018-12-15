const path = require("path");

function resolvePath(...pathArguments) {
  return path.join(__dirname, "..", "..", ...pathArguments);
}


exports.resolvePath = resolvePath;