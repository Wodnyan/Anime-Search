import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../../db/db";

const router = express.Router();

router.delete("/delete", async (req, res, next) => {
    if (!req.body || !req.cookies.access_token) {
        return res
            .sendStatus(400)
            .json({ message: "User id or anime id was not provided" });
    }
    try {
        const token = jwt.verify(
            req.cookies.access_token,
            process.env.ACCESS_TOKEN_SECRET!
        );
        const update = await User.updateOne(
            { _id: token },
            { $pull: { liked: { mal_id: req.body.mal_id } } },
            { safe: true, multi: true }
        );
        res.json({ message: "Anime successfuly removed from liked" });
    } catch (error) {
        next(error);
    }
});

router.post("/add", async (req, res, next) => {
    if (!req.body || !req.cookies.access_token) {
        return res
            .sendStatus(400)
            .json({ message: "User id or anime id was not provided" });
    }
    try {
        const token = jwt.verify(
            req.cookies.access_token,
            process.env.ACCESS_TOKEN_SECRET!
        );
        //Check for duplicates
        const update = await User.updateOne(
            { _id: token },
            {
                $push: { liked: req.body },
            }
        );
        res.json({ message: "Successfuly added to liked" });
    } catch (error) {
        next(error);
    }
});

export default router;
