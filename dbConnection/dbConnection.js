import mongoose from "mongoose";

const dbconnection = () => {
    return mongoose.connect(process.env.CONNECTION_DATABASE_URL).then(() => {
        console.log("database connected successfully");
    }).catch((error) => {
        console.log("database error", error);
    });
}

export default dbconnection;