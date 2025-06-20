
import mongoose from 'mongoose';
import 'dotenv/config'
import app from './app';
const PORT = 5000;




async function main() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@cluster0.aif7qmj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
            .then(() => {
                console.log("Connected to MongoDB")
            })
            .catch((error) => {
                console.log(error)
            })
        app.listen(PORT, () => {
            console.log(`The server is running on the port: ${PORT}`)
        })

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }

}




main()