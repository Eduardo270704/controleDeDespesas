import { Router, Request, Response } from "express";
import expense from "./Expense";

const router = Router();

router.use("/expense", expense);

export default router;
