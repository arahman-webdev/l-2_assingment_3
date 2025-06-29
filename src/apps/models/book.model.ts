import mongoose, { Model, model, Schema, Types } from "mongoose";
import { IBook, IBookStaticMethod } from "../interfaces/book.interface";


const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    required: true,
    enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: { type: String },
  copies: {
    type: Number,
    required: true,
    min: [0, "Copies must be non-negative"]
  },
  available: {
    type: Boolean,
    default: true
  }
}, { timestamps: true, versionKey: false });


// static method applied here
bookSchema.statics.updateQuantity = async function (bookId: Types.ObjectId, quantity: number) {
  const book = await this.findById(bookId);
  
   if (!book) throw new Error("Book not found");

  if(book.copies < quantity) throw new Error("Not enough copies")
  
    book.copies = book.copies - quantity;

    if(book.copies === 0){
      book.available = false
    }

    await book.save()
}

// pre middleware hook -----------
bookSchema.pre("save", function (next) {
    console.log("A book information is saved");
    next()
})

// post middleware hook -----------

bookSchema.post("save", function (doc, next) {
  console.log(`Book saved: ${doc.isbn}`);
  next()
});



export const Book = model<IBook, Model<IBook> & IBookStaticMethod>("Book", bookSchema);









