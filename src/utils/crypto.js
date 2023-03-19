import CryptoJS from "crypto-js";

// https://www.cnblogs.com/sban/p/17009380.html
// https://stackoverflow.com/questions/38990630/converting-javas-pbewithmd5anddes-to-javascript
// https://blog.csdn.net/qq_38916811/article/details/127515455
// https://blog.51cto.com/u_15082498/5677815
// https://github.com/brix/crypto-js/issues/421
// https://stackoverflow.com/questions/60520526/aes-encryption-and-decryption-of-files-using-crypto-js
// https://doc.libsodium.org/bindings_for_other_languages
// https://www.cnblogs.com/huiguo/p/16601076.html
// http://www.jasypt.org/encrypting-texts.html
// https://stackoverflow.com/questions/72984983/how-to-create-a-function-in-javascript-to-simulate-the-same-functionality-of-pbe
export function decrypt(blob) {
    var passphrase = "ASTER_cass_NO_el_mind_auth_company";
    var saltWA = CryptoJS.enc.Hex.parse("0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f"); // static only for test!
    var ivWA = CryptoJS.enc.Hex.parse("0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f"); // static only for test!
    var iterations = 10000;
    var keyWA = CryptoJS.PBKDF2(passphrase, saltWA, {
        keySize: 256 / 32,
        iterations: iterations,
        hasher: CryptoJS.algo.SHA256
    });

    return new Promise(function (resolve) {
        var reader2 = new FileReader();
        reader2.readAsArrayBuffer(blob);
        reader2.onload = () => {
            var code = CryptoJS.lib.WordArray.create(reader2.result)
            var wordArray = CryptoJS.enc.Base64.stringify(code)
            var decrypted = CryptoJS.AES.decrypt(wordArray, keyWA, {iv: ivWA});
            resolve(decrypted.toString(CryptoJS.enc.Utf8))

        }
    })
}

