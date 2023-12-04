// UserService.ts
import axios from 'axios';
import cookieService from './cookie.service';
import CryptoJS from 'crypto-js';
import forge from 'node-forge';
import { Buffer } from 'buffer';
import userServiceConfig from './user.service.config';


class UserService {

  async decryptAESKey(encryptedKey: any) {
    const privateKey = forge.pki.privateKeyFromPem(cookieService.get('reqPriKey'));

    const keyData = Buffer.from(encryptedKey);
    const keyDataBuffer = Buffer.from(keyData);
    const keyDataBinary = keyDataBuffer.toString('binary');
    const decryptedKeyBuffer = privateKey.decrypt(keyDataBinary, 'RSA-OAEP');
    const decryptedKey = Buffer.from(decryptedKeyBuffer, 'binary');
    const AESKey = CryptoJS.lib.WordArray.create(decryptedKey);

    return AESKey;
  }

  async decryptData(encryptedData: any, AESKey: any, iv:any) {
    const bufferData = Buffer.from(encryptedData);
    // Create a WordArray from the byte array
    const encryptedContent = CryptoJS.lib.WordArray.create(bufferData);

    // Decrypt the data
    const decryptedData = CryptoJS.AES.decrypt(
      { ciphertext: encryptedContent },
      AESKey,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    );

    // Convert the decrypted data to a string
    const decryptedContent = decryptedData.toString(CryptoJS.enc.Utf8);
    return decryptedContent;

  }

  async getUserInfo() {
    let response;
    try {
      response = await axios.get(userServiceConfig.getUserInfo, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'authorization': 'Bearer ' + cookieService.get('accessToken')
        }
      });
    } catch (error) {
      console.error('Error making request:', error);
      return { error: 'Failed to retrieve user information.' };
    }
  
    if (response.status === 200 || response.status === 201) {
      console.log('Get user info successful');
      const encryptedData = response.data; // The encrypted data
  
      let iv, AESKey, applicantInfo;
      try {
        const ivData = Buffer.from(encryptedData.data.iv);
        iv = CryptoJS.lib.WordArray.create(ivData);
        AESKey = await this.decryptAESKey(encryptedData.data.encryptedKey.data);
        applicantInfo = await this.decryptData(encryptedData.data.data, AESKey, iv);
      } catch (error) {
        console.error('Error processing data:', error);
        return { error: 'Failed to process user information.' };
      }
  
      return applicantInfo;
    } else {
      console.log('Get user info failed');
      return { error: 'Failed to retrieve user information.' };
    }
  }

}

export default new UserService();