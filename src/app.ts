import express, { Application } from "express"
const app:Application = express();
app.use(express.json())
import { router } from "./apps/controllers/book.controller";
import { borrowRouter } from "./apps/controllers/borrow.controller";


app.get('/', (req, res)=>{
    res.send("Hi, world!")
})

app.use('/', router)
app.use('/', borrowRouter)

export default app;