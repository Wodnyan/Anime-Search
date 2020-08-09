import express from "express";
import { User } from "../../db/db";

const router = express.Router();

router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findOne({
            _id: userId,
        });
        const { _id, username, liked, profilePicture } = user;
        res.json({
            message: "Successfuly returned user",
            userInfo: {
                _id,
                username,
                liked,
                profilePicture,
            },
        });
    } catch (err) {
        res.status(400).json({
            message:
                "There was a problem with your request, check if the user id is correct",
        });
    }
});

export default router;
