
import mongoose from 'mongoose';
import 'dotenv/config'
import app from './app';
const PORT = 5000;




async function main() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@cluster0.aif7qmj.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster0`)
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


main()