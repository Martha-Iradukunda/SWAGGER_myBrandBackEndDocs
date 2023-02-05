import mongoose from "mongoose";
const databaseConnection = async() => {

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('database connected')

    } catch (err) {
        console.log(err.message)
    }
}

export default databaseConnection;