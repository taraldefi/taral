import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    // Initialize Stripe
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  async createCustomer(
    importerId: string,
    name: string,
    email: string,
  ): Promise<Stripe.Customer> {
    try {
      const customer = await this.stripe.customers.create({
        name,
        email,
        metadata: {
          importedId: importerId,
        },
      });
      return customer;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  }

  async createPrice(
    unitAmount: number,
    productId: string,
  ): Promise<Stripe.Price> {
    try {
      const price = await this.stripe.prices.create({
        currency: 'usd',
        unit_amount: unitAmount,
        product_data: {
          name: productId,
        },
      });
      return price;
    } catch (error) {
      console.error('Error creating price:', error);
      throw error;
    }
  }

  async createAndSendInvoice(
    customerId: string,
    priceId: string,
  ): Promise<Stripe.Invoice> {
    try {
      const invoice = await this.stripe.invoices.create({
        customer: customerId,
        collection_method: 'send_invoice',
        days_until_due: 30,
      });
      await this.stripe.invoiceItems.create({
        customer: customerId,
        price: priceId,
        invoice: invoice.id,
      });
      const sendInvoice = await this.stripe.invoices.sendInvoice(invoice.id);
      return sendInvoice;
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw error;
    }
  }
}
