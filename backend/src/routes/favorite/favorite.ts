import express from "express";
import { User } from "../../db/db";

const router = express.Router();

router.get("/delete", (req, res) => {
    console.log(req.query.userId);
});

export default router;
