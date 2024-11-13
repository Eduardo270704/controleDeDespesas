import mongoose, { Schema } from "mongoose";
import { IExpense } from "../../Interfaces";

const ExpenseSchema: Schema = new Schema({
  description: {
    type: String,
    required: [true, "A descrição é obrigatória."],
    trim: true,
    minlength: [3, "A descrição deve ter no mínimo 3 caracteres."],
  },
  amount: {
    type: Number,
    required: [true, "O valor é obrigatório."],
    min: [0, "O valor não pode ser negativo."],
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model<IExpense>("Expense", ExpenseSchema);
