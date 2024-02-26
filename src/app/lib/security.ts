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