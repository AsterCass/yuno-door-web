var CryptoJS = require("crypto-js");

export function test1() {
    var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();
// Decrypt
    var bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log(originalText); // 输出'my message'
}


export function test2() {
    var password = CryptoJS.enc.Utf8.parse("test");
    var salt = CryptoJS.enc.Hex.parse("2121F055C39F5A75");
    var iterations = 31;

// PBE according to PKCS#5 v1.5 (in other words: PBKDF1)
    var md5 = CryptoJS.algo.MD5.create();
    md5.update(password);
    md5.update(salt);
    var result = md5.finalize();
    md5.reset();
    for (var i = 1; i < iterations; i++) {
        md5.update(result);
        result = md5.finalize();
        md5.reset();
    }

// splitting key and IV
    var key = CryptoJS.lib.WordArray.create(result.words.slice(0, 2));
    var iv = CryptoJS.lib.WordArray.create(result.words.slice(2, 4));

    var encrypted = CryptoJS.DES.encrypt("test12343", key, {
        iv: iv
    });


    var decrypted = CryptoJS.DES.decrypt(encrypted, key, {
        iv: iv
    })

    console.log(decrypted.toString(CryptoJS.enc.Utf8))

    console.log(encrypted.ciphertext.toString())
    console.log(encrypted.ciphertext.toString(CryptoJS.enc.Base64));
}

function bufferToHex(buffer) {
    return [...new Uint8Array(buffer)]
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

export async function test3(blob) {
    console.log(blob)
    var reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    reader.onload = function (evt) {
        console.log(evt)
        console.log(bufferToHex(reader.result))

    }


    var passphrase = "My Passphrase";
    var saltWA = CryptoJS.enc.Hex.parse("000102030405060708090a0b0c0d0e0f"); // static only for test!
    var ivWA = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f"); // static only for test!
    var iterations = 10000;
    var plaintext = "The quick brown fox jumps over the lazy dog";

    var keyWA = CryptoJS.PBKDF2(
        passphrase, saltWA, {keySize: 256 / 32, iterations: iterations, hasher: CryptoJS.algo.SHA256});

    var ciphertextCP = CryptoJS.AES.encrypt(plaintext, keyWA, {iv: ivWA}); // applies CBC and PKCS#7 by default
    var ciphertextHex = ciphertextCP.ciphertext.toString();
    console.log(ciphertextHex)// a08af68882ef646631c510b0742272308eca57bd251f962444a01abcecf41bfc804b5e3e9f666f125103d1954809edd5

    // var reader2= new FileReader();
    // reader2.readAsArrayBuffer(content);
    // reader2.onload = function(wordArray) {
    //     let decrypted = CryptoJS.AES.decrypt(wordArray, keyWA, {iv: ivWA});
    //     console.log(decrypted.toString(CryptoJS.enc.Utf8))
    // }


    // https://blog.csdn.net/qq_38916811/article/details/127515455
    var reader2 = new FileReader();
    reader2.readAsArrayBuffer(blob);
    reader2.onload = () => {
        console.log("222")
        var x = CryptoJS.lib.WordArray.create(reader2.result)
        console.log(x)
        var wordArray = CryptoJS.enc.Base64.stringify(x)
        console.log(wordArray)
        var decrypted = CryptoJS.AES.decrypt(wordArray, keyWA, {iv: ivWA});
        console.log(decrypted)
        // console.log(wordArrayBit)
        // console.log(reader2.result)
        // const encrypt = CryptoJS.AES.decrypt(wordArrayBit, keyWA, {iv: ivWA});
        // 根据实际场景返回
        console.log(decrypted.toString(CryptoJS.enc.Utf8))
        // return CryptoJS.enc.Base64.stringify(encrypt.ciphertext)
    }


    // var ivWA2 = CryptoJS.enc.Hex.parse("0");
    var decrypted = CryptoJS.AES.decrypt(ciphertextCP, keyWA, {iv: ivWA})
    console.log(decrypted)
    console.log(decrypted.toString(CryptoJS.enc.Utf8))
}


async function encryptBlobToBlob(blob, secret) {
    const wordArray = CryptoJS.lib.WordArray.create(await blob.arrayBuffer());
    console.log("wordArray")
    console.log(wordArray)
    const result = CryptoJS.AES.encrypt(wordArray, secret);
    console.log("result")
    console.log(result)
    return new Blob([result.toString()]);
}

export async function decryptBlobToBlob(blob, secret) {
    const decryptedRaw = CryptoJS.AES.decrypt(await blob.text(), secret);
    console.log("decryptedRaw")
    console.log(decryptedRaw)
    return new Blob([wordArrayToByteArray(decryptedRaw)]);
}

export async function decryptBlobToBlob2(blob, secret, ivWA) {
    // const wordArray = CryptoJS.lib.WordArray.create(await blob.arrayBuffer());
    // console.log("wordArray")
    // console.log(wordArray)
    const decryptedRaw = CryptoJS.AES.decrypt(blob, secret, {iv: ivWA});
    console.log("decryptedRaw")
    console.log(decryptedRaw)
    return new Blob([wordArrayToByteArray(decryptedRaw)]);
}

function wordToByteArray(word, length) {
    const ba = [];
    const xFF = 0xff;
    if (length > 0) ba.push(word >>> 24);
    if (length > 1) ba.push((word >>> 16) & xFF);
    if (length > 2) ba.push((word >>> 8) & xFF);
    if (length > 3) ba.push(word & xFF);

    return ba;
}

// function convertWordArrayToUint8Array(wordArray) {
//     var arrayOfWords = wordArray.hasOwnProperty("words") ? wordArray.words : [];
//     var length = wordArray.hasOwnProperty("sigBytes") ? wordArray.sigBytes : arrayOfWords.length * 4;
//     var uInt8Array = new Uint8Array(length), index=0, word, i;
//     for (i=0; i<length; i++) {
//         word = arrayOfWords[i];
//         uInt8Array[index++] = word >> 24;
//         uInt8Array[index++] = (word >> 16) & 0xff;
//         uInt8Array[index++] = (word >> 8) & 0xff;
//         uInt8Array[index++] = word & 0xff;
//     }
//     return uInt8Array;
// }

function wordArrayToByteArray({words, sigBytes}) {
    const result = [];
    let bytes;
    let i = 0;
    while (sigBytes > 0) {
        bytes = wordToByteArray(words[i], Math.min(4, sigBytes));
        sigBytes -= bytes.length;
        result.push(bytes);
        i++;
    }
    return new Uint8Array(result.flat());
}

export async function main() {
    const secret = "bbbb";
    const blob = new Blob(["1".repeat(1e3)]);
    console.log("content1")
    console.log(blob)
    const encryptedBlob = await encryptBlobToBlob(blob, secret);
    console.log("enrypted blob size")
    console.log(encryptedBlob.size)
    console.log("content2")
    console.log(encryptedBlob)
    const decryptedBlob = await decryptBlobToBlob(encryptedBlob, secret);
    console.log("decryptedBlob");
    console.log(await decryptedBlob.text());
}

export async function test4(content) {
    var passphrase = "MyPassphrase";
    var saltWA = CryptoJS.enc.Hex.parse("000102030405060708090a0b0c0d0e0f"); // static only for test!
    var ivWA = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f"); // static only for test!
    var iterations = 10000;
    var keyWA = CryptoJS.PBKDF2(
        passphrase, saltWA, {keySize: 256 / 32, iterations: iterations, hasher: CryptoJS.algo.SHA256});


    console.log("content")
    console.log(content)
    const decryptedBlob = await decryptBlobToBlob2(content, keyWA, {iv: ivWA});
    console.log("decryptedBlob");
    console.log(await decryptedBlob.text());
}


export function test(content) {
    console.log(111)
    test3(content)
    // test4(content).then(r =>
    // console.log(r))
}