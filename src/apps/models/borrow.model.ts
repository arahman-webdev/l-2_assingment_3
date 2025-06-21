import mongoose, { Schema } from "mongoose";
import { IBorrowBook } from "../interfaces/borrow.interface";

const borrowSchema = new mongoose.Schema<IBorrowBook>({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    quantity: {
        type: Number,
        min: [1, "Quantity must be at least 1"]
    },
    dueDate: {
        type: Date,
        required: true
    }
}, {timestamps:true, versionKey:false})


export const BorrowBook = mongoose.model('BorrowBook', borrowSchema)