import express from "express";
import passport from "passport";

const router = express.Router();
const CLIENT_URL = "http://localhost:3000/";

router.get("/github", passport.authenticate("github"));

router.get(
    "/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/login/fail",
        successRedirect: CLIENT_URL,
    })
);

router.get("/facebook", passport.authenticate("facebook"));

router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
        failureRedirect: "/login/fail",
        successRedirect: CLIENT_URL,
    })
);

router.get("/twitter", passport.authenticate("twitter"));

router.get(
    "/twitter/callback",
    passport.authenticate("twitter", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/fail",
    })
);

router.get("/login/fail", (req, res) => {
    res.sendStatus(401);
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
});

router.get("/login", (req, res) => {
    if (req.user) {
        const { username, profilePicture, provider } = req.user;
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

export default router;
