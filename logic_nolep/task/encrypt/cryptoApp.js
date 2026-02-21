const CryptoJS = require("crypto-js");

function encrypt(text, key) {
  return CryptoJS.AES.encrypt(text, key).toString();
}

function decrypt(encryptedText, key) {
  return CryptoJS.AES.decrypt(encryptedText, key).toString(CryptoJS.enc.Utf8);
}

module.exports = {
  encrypt,
  decrypt,
};

