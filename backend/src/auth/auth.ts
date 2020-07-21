import dotenv from "dotenv";
import path from "path";
import express from "express";
import passport from "passport";
import facebookOAuth from "passport-facebook";
import githubOAuth from "passport-github";
import { User } from "../db/db";

dotenv.config();

const router = express.Router();
// const FacebookStrategy = facebookOAuth.Strategy;
//http://localhost:5050/auth/github/callback
const GithubStrategy = githubOAuth.Strategy;
const CLIENT_URL = "http://localhost:3000/";

passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GITHUB_APP_ID!,
            clientSecret: process.env.GITHUB_APP_SECRET!,
            callbackURL: "http://localhost:5050/auth/github/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            const alreadyPresent = await User.findOne({
                providerId: profile.id,
                provider: profile.provider,
            });
            if (alreadyPresent) {
                console.log("Found One");
                return done(null, alreadyPresent);
            }
            //TODO: Profile picture is possibly undefined.
            const newUser = await User.create({
                providerId: profile.id,
                username: profile.username,
                provider: profile.provider,
                profilePicture: profile.photos[0].value,
            });
            return done(null, newUser);
        }
    )
);

router.get("/github", passport.authenticate("github"));

router.get("/login/fail", (req, res) => {
    res.sendStatus(401);
});

router.get("/logout", (req, res) => {
    //Log user out
});

router.get("/login", (req, res) => {
    const { username, profilePicture, provider } = req.user;
    if (req.user) {
        res.json({
            user: {
                username,
                profilePicture,
                provider,
            },
            message: "Successful Authorization",
        });
    } else {
        res.status(401).json({
            message: "Client doesn't have or has an incorrect session token",
        });
    }
});

router.get(
    "/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/login/fail",
        successRedirect: CLIENT_URL,
    })
);

export default router;
