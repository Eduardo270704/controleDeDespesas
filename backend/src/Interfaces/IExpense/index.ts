import { Document } from 'mongoose';

interface IExpense extends Document {
    description: string;
    amout: number;
    date: Date;
}

export default IExpense;