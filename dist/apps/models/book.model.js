"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
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
bookSchema.statics.updateQuantity = function (bookId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield this.findById(bookId);
        if (!book)
            throw new Error("Book not found");
        if (book.copies < quantity)
            throw new Error("Not enough copies");
        book.copies = book.copies - quantity;
        if (book.copies === 0) {
            book.available = false;
        }
        yield book.save();
    });
};
// pre middleware hook -----------
bookSchema.pre("save", function (next) {
    console.log("A book information is saved");
    next();
});
// post middleware hook -----------
bookSchema.post("save", function (doc, next) {
    console.log(`Book saved: ${doc.isbn}`);
    next();
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
