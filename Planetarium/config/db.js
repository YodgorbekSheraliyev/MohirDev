const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
    const connecting = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected to  ${connecting.connection.host}`.bgBlue)
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectDB