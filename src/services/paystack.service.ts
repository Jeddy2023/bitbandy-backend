export interface PaystackService {
  createPaymentSession(amount: number, email: string, eventId: string, quantity: number): Promise<any>;
}