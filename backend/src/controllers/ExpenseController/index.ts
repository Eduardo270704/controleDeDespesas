import { Request, Response } from "express";
import { Expense } from "../../models";

const createExpense = async (req: Request, res: Response): Promise<void> => {
  try {
    const { description, amout, date } = req.body;
    const newExpense = new Expense({ description, amout, date });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Error creating expense", error });
  }
};

const getExpense_ExpenseTotal = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const expenses = await Expense.find();
    const total = expenses.reduce((sum, expense) => sum + expense.amout, 0);
    res.status(200).json({ expenses, total });
  } catch (error) {
    res.status(500).json({ message: "Error getting expenses", error });
  }
};

const updateExpense = async (req: Request, res: Response): Promise<void> => {
  try {
    const { _id } = req.params;
    const { description, amout, date } = req.body;
    const updatedExpense = await Expense.findByIdAndUpdate(
      _id,
      { description, amout, date },
      { new: true }
    );
    if (updatedExpense) {
      res.status(200).json(updatedExpense);
    } else {
      res.status(404).json({ message: "Expense not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating expense", error });
  }
};

const deleteExpense = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (deletedExpense) {
      res.status(200).json({ message: "Expense deleted successfully" });
    } else {
      res.status(404).json({ message: "Expense not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense", error });
  }
};

export { createExpense, getExpense_ExpenseTotal, updateExpense, deleteExpense };
