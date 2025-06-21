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
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const PORT = 5000;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@cluster0.aif7qmj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
                .then(() => {
                console.log("Connected to MongoDB");
            })
                .catch((error) => {
                console.log(error);
            });
            app_1.default.listen(PORT, () => {
                console.log(`The server is running on the port: ${PORT}`);
            });
        }
        catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    });
}
/**
 *
 * 1. create interface with typescript
 * 2. create a schema and call model
 * 3
 */
/** This is for schema-----------------------
 * 1. Define a schema
 * 2. Create a model with a variable
 * 3. Use the modle with a variable. That means inserted data into it. There are two ways to insert data. One is: new + model, another is: model.create()
 * 4. Automatically data insert and req.body: such as: const reqBody = req.body. const newUser = await user.create(reqBody)
 * 5. At last save inserted data variable like this user.save()
 */
/** find data ----------------
 * 1. mode.find
 * 2. model.findOne ----- jekono filed diye search kora jay. such as: name, tile, etc
 * 3. model.findById -- only id acceptable
 *
 */
main();
