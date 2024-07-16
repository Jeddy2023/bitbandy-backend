import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export { Transaction };
