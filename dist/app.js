"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const book_controller_1 = require("./apps/controllers/book.controller");
const borrow_controller_1 = require("./apps/controllers/borrow.controller");
app.get('/', (req, res) => {
    res.send("Hi, world!");
});
app.use('/', book_controller_1.router);
app.use('/', borrow_controller_1.borrowRouter);
exports.default = app;
