require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");

const cors = require('cors')

const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => {
    console.log("Successfully connected to MongoDB via Mongoose!");

    const userRouter = require("./Routes/users");
    app.use("/users", userRouter);

    const accountRouter = require("./Routes/accounts");
    app.use("/accounts", accountRouter);

    const transactionRouter = require("./Routes/transactions");
    app.use("/transactions", transactionRouter);

    const recurringTransactionRouter = require("./Routes/recurringTransactions");
    app.use("/recurringTransactions", recurringTransactionRouter);

    app.locals.db = db;

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }).catch((err) => {
    console.error(err)
  });
