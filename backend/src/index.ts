import express from "express";
import auth from "./auth/auth";
const app = express();
const PORT = 5050;

app.use("/auth", auth);
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
