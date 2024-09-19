const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.routes");
const holdingRouter = require("./routes/holding.routes");
const transactionRouter = require("./routes/transaction.routes");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://heelpatelcodes:FMoDNOGIemYtMvEm@crypto-compass-cluster.tdmka.mongodb.net/?retryWrites=true&w=majority&appName=Crypto-Compass-Cluster"
  )
  .then((res) => console.log("DB Connected Successfully!"))
  .catch((err) => console.log("Error While Connecting With DB:" + err));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/user", userRouter);
app.use("/holding", holdingRouter);
app.use("/transaction", transactionRouter);

app.get("/", (req, res) => {
  res.json({
    name: "Narendra Modi",
  });
});

app.listen(3000, () => {
  console.log("Server is running 🏃🏻‍♂️!");
});
