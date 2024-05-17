// quickbooks.controller.ts
import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { QuickBooksService } from './quickbook.service';
import ClientOAuth2 from 'client-oauth2';

@Controller('quickbooks')
export class QuickBooksController {
  constructor(private quickBooksService: QuickBooksService) {}


  @Get('connect_to_quickbooks')
  async connect_to_quickbooks() {
    
    return this.quickBooksService.getUri();
  }

  @Get('callback')
  async callback(@Req() request: Request) {
   
    return this.quickBooksService.getToken(request);
  }

  // @Post('customer')
  // async createCustomer(@Body() customer: any) {
  //   const createdCustomer = await this.quickBooksService.createCustomer(customer);
  //   return createdCustomer;
  // }

  // @Post('payment')
  // async createPayment(@Body() payment: any) {
  //   const createdPayment = await this.quickBooksService.createPayment(payment);
  //   return createdPayment;
  // }

  // @Get('payment/:paymentId')
  // async getPayment(@Param('paymentId') paymentId: string) {
  //   const payment = await this.quickBooksService.getPayment(paymentId);
  //   return payment;
  // }

  // @Get('invoices')
  // async getInvoices() {
  //   const invoices = await this.quickBooksService.getInvoices();
  //   return invoices;
  // }

  // @Get('financial-statements')
  // async getFinancialStatements() {
  //   const financialStatements = await this.quickBooksService.getFinancialStatements();
  //   return financialStatements;
  // }
}