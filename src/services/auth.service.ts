// AuthService.ts
import axios from 'axios';
import JSEncrypt from 'jsencrypt';
import cookieService from './cookie.service';
import userService from './user.service';
import authServiceConfig from './auth.service.config';

class AuthService {

  async signin(user: any) {
    const response = await axios.post(authServiceConfig.signIn, user, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      }
    });

    if (response.status === 200 || response.status === 201) {
      let keyPair;
      console.log('Login successful');
      try {
        // Generate key pair
        keyPair = await this.generateRequestKeyPair();
      } catch (error) {
        console.error('Error generating key pair:', error);
        return { error: 'Login failed during key pair generation.' };
      }

      try {
        // Store private key in cookie
        cookieService.set('reqPriKey', keyPair.reqPriKey);

        // Store access token in cookie
        cookieService.set('accessToken', response.data.data.token);
        // Store server public key  in cookie
        cookieService.set('serPubKey', response.data.data.serPubKey);
      } catch (error) {
        console.error('Error storing key in cookie:', error);
        return { error: 'Login failed during storing key.' };
      }

      try {
        // Send public key to server
        await this.sendPublicKey(keyPair.reqPubKey);
      } catch (error) {
        console.error('Error sending public key to server:', error);
        return { error: 'Login failed during sending public key.' };
      }

      try {
        // Get personal information
        const personalInfo = await userService.getUserInfo();
        return personalInfo;
      } catch (error) {
        console.error('Error getting personal information:', error);
        return { error: 'Login failed during getting personal information.' };
      }
    } else {
      console.log('Login failed');
      return { error: 'Login failed' };
    }
  }

  async generateRequestKeyPair() {
    const jsEncrypt = new JSEncrypt({ default_key_size: '2048' });
    const reqPriKey = jsEncrypt.getPrivateKey();
    const reqPubKey = jsEncrypt.getPublicKey();
    return { reqPriKey, reqPubKey };
  }

  async sendPublicKey(publicKey: string) {
    const param = {
      publicKey: publicKey
    };
    const response = await axios.put(authServiceConfig.updatePublicKey, param, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'authorization': 'Bearer ' + cookieService.get('accessToken')
      }
    });
    // Implement public key sending
  }
}

export default new AuthService();