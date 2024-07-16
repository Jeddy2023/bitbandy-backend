import { PaystackService } from "../paystack.service";
import { Transaction } from "../../models/transaction.model";
import axios from "axios";
import { CustomError } from "../../utils/customError.utils";

const secretKey = process.env.PAYSTACK_SECRET_KEY;

export class PaystackServiceImpl implements PaystackService {

  async verifyTransaction(reference: string): Promise<boolean> {
    const existingTransaction = await Transaction.findOne({ reference });
    if (!existingTransaction) {
      throw new CustomError(404, "Transaction not found");
    }

    return existingTransaction.status === "success";
  }

  async createPaymentSession(amount: number, email: string): Promise<Object> {
    const response = await axios.post("https://api.paystack.co/transaction/initialize", {
      email,
      amount: amount * 100
    }, {
      headers: {
        Authorization: `Bearer ${secretKey}`
      }
    });

    const authorizationUrl = response.data.data.authorization_url;
    const reference = response.data.data.reference;
    return { authorizationUrl, reference };
  } catch (error: any) {
    throw new CustomError(500, "Failed to create payment session");
  }

}