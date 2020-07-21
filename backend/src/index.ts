import express from "express";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import cors from "cors";
import passport from "passport";
import auth from "./auth/auth";
import { User } from "./db/db";
const app = express();
const PORT = 5050;

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
        keys: [process.env.SESSION_KEY],
        maxAge: 24 * 60 * 60 * 100,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", auth);

interface UserData {
    providerId: number;
    provider: string;
    username: string;
    profilePicture: string;
}

passport.serializeUser((user: UserData, done) => {
    const { providerId, provider } = user;
    return done(null, { providerId, provider });
});

passport.deserializeUser(async ({ providerId, provider }, done) => {
    const user = await User.findOne({
        providerId,
        provider,
    });
    return done(null, user);
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
