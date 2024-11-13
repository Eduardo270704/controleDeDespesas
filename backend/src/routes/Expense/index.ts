import { Router } from "express";
import {
  createExpense,
  getExpense_ExpenseTotal,
  updateExpense,
  deleteExpense,
} from "../../controllers";

const router = Router();

router.post("/", createExpense);
router.get("/", getExpense_ExpenseTotal);
router.put("/:_id", updateExpense);
router.delete("/:_id", deleteExpense);

export default router;
