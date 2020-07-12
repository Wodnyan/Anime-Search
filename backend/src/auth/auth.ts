import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import facebookOAuth from "passport-facebook";
dotenv.config();
const router = express.Router();
const FacebookStrategy = facebookOAuth.Strategy;
passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID!,
            clientSecret: process.env.FACEBOOK_APP_SECRET!,
            callbackURL: "http://localhost:3000/",
        },
        (accessToken, refreshToken, profile, done) => {
            console.log(profile);
        }
    )
);

router.get("/facebook", passport.authenticate("facebook"));

export default router;
