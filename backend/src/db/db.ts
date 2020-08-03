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

const animeSchema = new mongoose.Schema({
    mal_id: {
        type: Number,
        required: true,
    },
    image_url: {
        type: String,
        required: false,
    },
    synopsis: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    episodes: {
        type: Number,
        required: true,
    },
    members: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
});

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
    liked: [animeSchema],
});
export const User = mongoose.model("users", userSchema);
