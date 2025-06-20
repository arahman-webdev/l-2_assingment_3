import express, { Application } from "express"
const app:Application = express();
app.use(express.json())
import bookRouter from "./apps/controllers/book.controller"


app.get('/', (req, res)=>{
    res.send("Hi, world!")
})

app.use('/', bookRouter)

export default app;