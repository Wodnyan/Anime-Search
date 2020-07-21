import dotenv from "dotenv";
import express from "express";
import passport from "passport";

const router = express.Router();
const CLIENT_URL = "http://localhost:3000/";

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
