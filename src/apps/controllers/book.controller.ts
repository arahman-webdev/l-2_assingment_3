import express, { Request, Response, Router } from "express"
import { Book } from "../models/book.model"
export const router = express.Router()


router.post("/api/books", async (req: Request, res: Response) => {
    try {

        const newBook = new Book(req.body)

        const savedBook = await newBook.save()

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: savedBook
        })
    } catch (error: any) {
        
        res.status(404).json({
            message: "Validation failed",
            success: false,
            error
        })
    }
})



router.get('/api/books', async (req: Request, res: Response) => {
    try {

        const { genre } = req.query;
        const filterByGenre = genre ? { genre } : {}
        const books = await Book.find(filterByGenre).sort({ title: -1 }).limit(10)


        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,

        })
    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to retrieve books"
        })
    }
})

router.get('/api/books/:bookId', async (req: Request, res: Response) => {
    try {
        const book = req.params.bookId;

        const singleBook = await Book.findById(book)

        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: singleBook,

        })

    } catch (error: any) {
        console.log(error.message)
    }
})


// update a book using id

router.put('/api/books/:bookId', async (req: Request, res: Response) => {

    try {
        const filter = req.params.bookId;
        const update = { copies: 100 };

        const updateBook = await Book.findByIdAndUpdate(filter, update, {
            new: true
        })

        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updateBook,
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
            error
        })
    }

})


// remove a book 

router.delete('/api/books/:bookId', async (req: Request, res: Response) => {

    try {
        const bookId = req.params.bookId;

        const deleteBook = await Book.findByIdAndDelete(bookId)

        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: deleteBook
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            success: false,
            message: "Failed to delete a book",
        })

    }

})