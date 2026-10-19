import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

    private KEY = '1Hbfh667adfDEJ78';

    encrypt(data: string): string {
        const key = CryptoJS.enc.Utf8.parse(this.KEY);

        const encrypted = CryptoJS.AES.encrypt(
            CryptoJS.enc.Utf8.parse(data),
            key,
            {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            }
        );

        return CryptoJS.enc.Base64.stringify(
            encrypted.ciphertext
        );
    }

    decrypt(encryptedData: string): string {
        const key = CryptoJS.enc.Utf8.parse(this.KEY);

        const ciphertext = CryptoJS.enc.Base64.parse(encryptedData);

        const cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: ciphertext
        });

        const decrypted = CryptoJS.AES.decrypt(
            cipherParams,
            key,
            {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            }
        );

        return CryptoJS.enc.Utf8.stringify(decrypted);
    }
}