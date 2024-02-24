import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    // Initialize Stripe
    console.log(process.env.STRIPE_SECRET_KEY);
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  async createCustomer(importerId: string): Promise<Stripe.Customer> {
    try {
      const customer = await this.stripe.customers.create({
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
}
