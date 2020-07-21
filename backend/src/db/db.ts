import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const URI = `mongodb+srv://wodnyan:${process.env.MONGO_DB}@my-cluster-jv3bc.mongodb.net/anime?retryWrites=true&w=majority`;
mongoose.connect(
    URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) return console.error(err);
        console.log("Connected to mongo");
    }
);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        required: true,
    },
    providerId: {
        type: Number,
        required: true,
    },
    profilePicture: String,
});
export const User = mongoose.model("users", userSchema);
