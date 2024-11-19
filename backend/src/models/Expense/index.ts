import mongoose, { Schema } from "mongoose";
import { IExpense } from "../../Interfaces";

const ExpenseSchema: Schema = new Schema({
  description: {
    type: String,
    required: [true, "A descrição é obrigatória."],
    trim: true,
    minlength: [3, "A descrição deve ter no mínimo 3 caracteres."],
    validate: {
      validator: function (value: string): boolean {
        return value.trim().length > 0;
      },
      message: "A descrição não pode conter apenas espaços.",
    },
  },
  amount: {
    type: Number,
    required: [true, "O valor é obrigatório."],
    min: [0, "O valor não pode ser negativo."],
    validate: {
      validator: function (value: number): boolean {
        return !isNaN(value);
      },
      message: "O valor deve ser um número válido.",
    },
  },
  date: {
    type: Date,
    required: [true, "A data é obrigatória."],
    default: Date.now,
    validate: {
      validator: function (value: Date): boolean {
        return value <= new Date();
      },
      message: "A data não pode ser no futuro.",
    },
  },
});

export default mongoose.model<IExpense>("Expense", ExpenseSchema);
