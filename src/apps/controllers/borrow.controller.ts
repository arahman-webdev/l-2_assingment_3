import express, { Request, Response } from "express"
import { BorrowBook } from "../models/borrow.model"
import { Book } from "../models/book.model";

export const borrowRouter = express.Router()




borrowRouter.post("/api/borrow", async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;

    await Book.updateQuantity(book, quantity);


    const borrowBook = new BorrowBook({ book, quantity, dueDate });
    const savedBorrow = await borrowBook.save();

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: savedBorrow
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
      success: false
    });
  }
});

borrowRouter.get('/api/borrow', async (req: Request, res: Response) => {
  try {
    const summary = await BorrowBook.aggregate([
      {
        $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } }
      },
      {
        $lookup: {
          from: "books",
          localField: '_id',
          foreignField: "_id",
          as: 'bookDetails'
        }
      },
      { $unwind: "$bookDetails" },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn"
          },
          totalQuantity: 1
        }
      }

    ])
    res.status(200).json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: summary
    });
  } catch (error) {
    console.log(error)
  }
})



