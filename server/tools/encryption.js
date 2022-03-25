const crypto = require("crypto");
const encryptString = function (strings) {
  const hash = crypto.createHash("md5");
  hash.update(strings);
  return hash.digest("hex");
};
module.exports = {
  encryptString,
}
