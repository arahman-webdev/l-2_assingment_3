import express, { Request, Response } from "express"
const router = express.Router()


router.post("/create", (req:Request, res:Response)=>{
    try {
        res.send("Creating a data into it")
        console.log("Done")
    } catch (error) {
        console.log("error from creating post",error)
    }
})


export default router;