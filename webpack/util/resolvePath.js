const path = require("path");

function resolvePath(...pathArguments) {
  console.log(__dirname);
  return path.join(__dirname, "..", "..", ...pathArguments);
}


exports.resolvePath = resolvePath;