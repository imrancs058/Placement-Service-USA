import { Injectable } from '@nestjs/common';
import axios from 'axios';
var ClientOAuth2 = require('client-oauth2')
var Tokens = require('csrf')
@Injectable()
export class QuickBooksService {
  private accessToken: string;
  private  authConfig ;
  private basicAuth;
  private intuitAuth;
   constructor() {
     this.basicAuth = require('btoa')('ABv1YfUEvyIBzlsLMgcrE1qnMIDy8iKgg3fNVoZbEZL2WwFaS7' + ':' + 'PJ11b6fBCNfG4AnLLzjBJffxG1TehdEv490PMA8c')
     this.authConfig={
      clientId: 'ABv1YfUEvyIBzlsLMgcrE1qnMIDy8iKgg3fNVoZbEZL2WwFaS7',
      clientSecret: 'PJ11b6fBCNfG4AnLLzjBJffxG1TehdEv490PMA8c',
      redirectUri: 'http://localhost:3001/quickbooks/callback',
      scopes: [
        'com.intuit.quickbooks.accounting',
        'com.intuit.quickbooks.payment'
      ],
      authorizationUri: 'https://appcenter.intuit.com/connect/oauth2',
      accessTokenUri: 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer'
    }
    this.intuitAuth = new ClientOAuth2(this.authConfig)
    }

async getUri(){
  var csrf = new Tokens()
  let secKey = csrf.secretSync()
   const csrfTok= csrf.create(secKey)
  var uri = await this.intuitAuth.code.getUri({
    // Add CSRF protection
    state: csrfTok
  })
  return uri;
}

async getToken(req){
  let bb=await this.intuitAuth.code.getToken(req.originalUrl)
  return bb;
}


  // async authenticate() {
  //   try {
  //     const authUrl = `https://appcenter.intuit.com/connect/oauth2?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=code&scope=com.intuit.quickbooks.accounting`;
  //     const response = await axios.get(authUrl);
  //     // Extract authorization code from the response
  //     console.log(response.data)
  //     const authorizationCode = response.data;
  //     return authorizationCode;
  //   } catch (err) {
  //     console.error('Error during authentication:', err);
  //     throw err; // Rethrow the error or handle it appropriately
  //   }
  // }

  // async getToken(code: string) {
  //   try {
  //     const tokenUrl = 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer';
  //     const headers = {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       Authorization: `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
  //     };
  //     const data = `grant_type=authorization_code&code=${code}&redirect_uri=${this.redirectUri}`;
  //     const response = await axios.post(tokenUrl, data, { headers });
  //     return response.data;
  //   } catch (err) {
  //     return err
  //   }

  // }

  // async getAccessToken() {
  //   try {
  //     if (!this.accessToken) {
  //       const code: any = await this.authenticate();
  //       const tokenResponse = await this.getToken(code);
  //       this.accessToken = tokenResponse.access_token;
  //     }
  //     return this.accessToken;
  //   } catch (err) {
  //     return err
  //   }

  // }

  // async createCustomer(customer: any) {
  //   try {
  //     const code = await this.authenticate();
  //     const tokenResponse = await this.getToken(code);
  //     const accessToken = tokenResponse.access_token;
  //     const apiUrl = 'https://quickbooks.api.intuit.com/v3/company/<companyId>/customer';
  //     const headers = {
  //       Authorization: `Bearer ${accessToken}`,
  //       'Content-Type': 'application/json',
  //     };
  //     const response = await axios.post(apiUrl, customer, { headers });
  //     return response.data;
  //   } catch (err) {
  //     console.error('Error creating customer:', err);
  //     throw err; // Rethrow the error or handle it appropriately
  //   }
  // }
  // async createPayment(payment: any) {
  //   const accessToken = await this.getAccessToken();
  //   const apiUrl = 'https://quickbooks.api.intuit.com/v3/company/<companyId>/payment';
  //   const headers = {
  //     Authorization: `Bearer ${accessToken}`,
  //     'Content-Type': 'application/json',
  //   };
  //   const response = await axios.post(apiUrl, payment, { headers });
  //   return response.data;
  // }

  // async getPayment(paymentId: string) {
  //   const accessToken = await this.getAccessToken();
  //   const apiUrl = `https://quickbooks.api.intuit.com/v3/company/<companyId>/payment/${paymentId}`;
  //   const headers = {
  //     Authorization: `Bearer ${accessToken}`,
  //     'Content-Type': 'application/json',
  //   };
  //   const response = await axios.get(apiUrl, { headers });
  //   return response.data;
  // }

  // async getInvoices() {
  //   const accessToken = await this.getAccessToken();
  //   const apiUrl = 'https://quickbooks.api.intuit.com/v3/company/<companyId>/invoice';
  //   const headers = {
  //     Authorization: `Bearer ${accessToken}`,
  //     'Content-Type': 'application/json',
  //   };
  //   const response = await axios.get(apiUrl, { headers });
  //   return response.data;
  // }

  // async getFinancialStatements() {
  //   const accessToken = await this.getAccessToken();
  //   const apiUrl = 'https://quickbooks.api.intuit.com/v3/company/<companyId>/report/FinancialStatement';
  //   const headers = {
  //     Authorization: `Bearer ${accessToken}`,
  //     'Content-Type': 'application/json',
  //   };
  //   const response = await axios.get(apiUrl, { headers });
  //   return response.data;
  // }
}
