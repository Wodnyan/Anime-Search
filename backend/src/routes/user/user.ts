import express from "express";
import { User } from "../../db/db";

const router = express.Router();

router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findOne({
            _id: userId,
        });
        if (!user) return res.sendStatus(404);
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
        res.send("There was something wrong with your id");
    }
});

export default router;
