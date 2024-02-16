import cryptojs from "crypto-js";

const SALT_LENGTH = 128;
const KEY_SIZE = 256 / 32;
const MIN_ITERATIONS = 3;
const MAX_ITERATIONS = 10;

function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function hashData(password: string) {
  var salt = cryptojs.lib.WordArray.random(SALT_LENGTH).toString(
    cryptojs.enc.Base64
  );
  var iterations = getRndInteger(MIN_ITERATIONS, MAX_ITERATIONS);
  var hash = cryptojs.PBKDF2(password, salt, {
    keySize: KEY_SIZE,
    iterations: iterations,
  });
  return {
    hash: hash.toString(cryptojs.enc.Base64),
    salt: salt,
    iterations: iterations,
  };
}

export function hashDataWithSaltRounds(
  password: string,
  salt: string,
  iterations: number
) {
  return cryptojs
    .PBKDF2(password, salt, {
      keySize: KEY_SIZE,
      iterations: iterations,
    })
    .toString(cryptojs.enc.Base64);
}

// export function storeToken(token: string) {
//   localStorage.setItem("token", token);
// }

// ローカルストレージにトークンがある場合は、デコードしてペイロードを返す
// export function getToken() {
//   const token = localStorage.getItem("token");
//   if (!token) return null;
//   const payload = JSON.parse(atob(token.split(".")[1]));
//   if (payload.exp < Date.now() / 1000) {
//     localStorage.removeItem("token");
//     return null;
//   }
//   return token;
// }

// export function removeToken() {
//   localStorage.removeItem("token");
// }
