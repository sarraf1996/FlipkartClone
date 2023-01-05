import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const mongoURI = `mongodb+srv://${username}:${password}@ecommerce-web.95sqfka.mongodb.net/flipkartCloneDB?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error while connecting with the database ", error.message);
    }
}

export default Connection;