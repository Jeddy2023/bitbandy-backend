export interface PaystackService {
  createPaymentSession(amount: number, email: string): Promise<any>;
  verifyTransaction(reference: string): Promise<boolean>;
}