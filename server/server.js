require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;
let usersCollection;

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    db = client.db("finance-tracker");

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );

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
  } catch (err) {
    console.error(err);
  }
}
run().catch(console.dir);
