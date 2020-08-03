import express from "express";
import dotenv from "dotenv";
import passportSetup from "./config/passport-setup";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import cors from "cors";
import passport from "passport";
import auth from "./routes/auth/auth";
import favorite from "./routes/favorite/favorite";
import user from "./routes/user/user";
const app = express();
const PORT = 5050;
const SESSION_KEY = process.env.SESSION_KEY!;

passportSetup();

dotenv.config();

app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    })
);

app.use(
    cookieSession({
        name: "session",
        keys: [SESSION_KEY],
        maxAge: 24 * 60 * 60 * 100,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use("/auth", auth);
app.use("/favorite", favorite);
app.use("/user", user);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
