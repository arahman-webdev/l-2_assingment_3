import { Types } from "mongoose";

export interface  IBook{
    title: string,
    author: string,
    genre: string,
    isbn: string,
    description: string,
    copies: number,
    available: boolean,
    
}

export interface IBookStaticMethod {
  updateQuantity(bookId:Types.ObjectId, quantity: number): Promise<void>;
}

