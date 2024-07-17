import { PaystackService } from "../paystack.service";
import axios from "axios";
import { CustomError } from "../../utils/customError.utils";

const secretKey = process.env.PAYSTACK_SECRET_KEY;

export class PaystackServiceImpl implements PaystackService {

  async createPaymentSession(amount: number, email: string, eventId: string, quantity: number): Promise<Object> {
    try {
      const response = await axios.post("https://api.paystack.co/transaction/initialize", {
        email,
        amount: amount * 100,
        metadata: { eventId, quantity }
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
}