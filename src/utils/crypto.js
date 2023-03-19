import CryptoJS from "crypto-js";


export function decrypt(blob) {
    var passphrase = "My Passphrase";
    var saltWA = CryptoJS.enc.Hex.parse("000102030405060708090a0b0c0d0e0f"); // static only for test!
    var ivWA = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f"); // static only for test!
    var iterations = 10000;
    var keyWA = CryptoJS.PBKDF2(
        passphrase, saltWA, {keySize: 256 / 32, iterations: iterations, hasher: CryptoJS.algo.SHA256});

    return new Promise(function (resolve) {
        var reader2 = new FileReader();
        reader2.readAsArrayBuffer(blob);
        reader2.onload = function (av) {
            console.log(av)
            var x = CryptoJS.lib.WordArray.create(reader2.result)
            var wordArray = CryptoJS.enc.Base64.stringify(x)
            console.log(wordArray)
            var decrypted = CryptoJS.AES.decrypt(wordArray, keyWA, {iv: ivWA});
            // console.log(decrypted)
            console.log(decrypted.toString(CryptoJS.enc.Utf8))

            // return decrypted.toString(CryptoJS.enc.Utf8)
            resolve(decrypted.toString(CryptoJS.enc.Utf8))

        }
    })
}

export async function main(blob) {
    let a = decrypt(blob).then(function (res) {
            console.log(res)
        }
    )
    console.log(a)
}

