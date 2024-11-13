import mongoose, { Schema } from "mongoose";
import { IExpense } from "../../Interfaces";

const ExpenseSchema: Schema = new Schema({
  description: { type: String, required: true },
  amout: { type: Number, required: true },
  date: { type: Date, required: true },
});

export default mongoose.model<IExpense>("Expense", ExpenseSchema);
