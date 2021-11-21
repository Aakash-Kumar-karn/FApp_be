const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3001;

const userRouter = require("./router/userRouter");
const foodRouter = require("./router/foodRouter");
const reviewRouter = require("./router/reviewRouter");

app.use(express.json());
app.use(cookieParser());

app.use("/api/user",userRouter);
app.use("/api/food", foodRouter);
app.use("/api/review", reviewRouter);

app.listen(PORT, () => {
    console.log(`server is successfully started at port ${PORT}`)
})