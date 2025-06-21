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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
const router = express_1.default.Router();
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBook = new book_model_1.Book({
            title: "The Theory of Everything",
            author: "Stephen Hawking",
            genre: "SCIENCE",
            isbn: "9780553380163",
            description: "An overview of cosmology and black holes.",
            copies: 5,
            available: true
        });
        const savedBook = yield newBook.save();
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            book: savedBook
        });
    }
    catch (error) {
        console.log("error from creating post", error);
        res.status(404).json({
            success: false,
            message: error.message,
            error
        });
    }
}));
