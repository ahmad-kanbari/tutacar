import Stripe from 'stripe';

// Mock Stripe implementation for development
const mockStripe = {
    paymentIntents: {
        create: async (params: Stripe.PaymentIntentCreateParams) => {
            console.log('Mock Stripe: Creating PaymentIntent', params);
            return {
                id: `pi_mock_${Math.random().toString(36).substr(2, 9)}`,
                client_secret: `sk_test_mock_${Math.random().toString(36).substr(2, 9)}`,
                amount: params.amount,
                currency: params.currency,
                status: 'requires_payment_method',
            } as Stripe.PaymentIntent;
        },
        retrieve: async (id: string) => {
            console.log('Mock Stripe: Retrieving PaymentIntent', id);
            return {
                id,
                status: 'succeeded',
                amount: 1000,
                currency: 'usd',
            } as Stripe.PaymentIntent;
        }
    },
};

// Use the mock or real Stripe based on env
export const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-11-17.clover',
        typescript: true,
    })
    : (mockStripe as unknown as Stripe);

export const createPaymentIntent = async (amount: number, currency: string = 'usd') => {
    return stripe.paymentIntents.create({
        amount,
        currency,
        automatic_payment_methods: {
            enabled: true,
        },
    });
};
