require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.routes");
const holdingRouter = require("./routes/holding.routes");
const transactionRouter = require("./routes/transaction.routes");
const testingRouter = require("./routes/testing.routes");
const mongoose = require("mongoose");
const cors = require("cors");
const { createHandlers } = require("@enjoys/exception");
const { ExceptionHandler } = createHandlers();

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then((res) => console.log("DB Connected Successfully!"))
  .catch((err) => console.log("Error While Connecting With DB:" + err));

const allowedOrigins = [
  "https://crypto-compass-l4zpsks4g-heelpatelcodesgmailcoms-projects.vercel.app/",
  "https://crypto-compass-three.vercel.app/",
  "https://cryptocompass-fe.vercel.app/",
  "http://localhost:5173", // Add any other development origins if needed
];

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://cryptocompass-fe.vercel.app"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  // console.log(req);
  next();
});

app.use(
  cors({
    origin: ["*"],
    credentials: true, // Allow cookies to be sent
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/user", userRouter);
app.use("/holding", holdingRouter);
app.use("/transaction", transactionRouter);
app.use("/test", testingRouter);

app.get("/", (req, res) => {
  res.json({
    name: "Narendra Modi",
  });
});

app.use("/*", (_, res) => {
  return res.json({
    KuchBhi: 123,
  });
});

app.listen(3000, () => {
  console.log("Server is running 🏃🏻‍♂️!");
});
