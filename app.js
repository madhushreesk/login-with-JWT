const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// import routes
const authRoute = require("./routes/auth");

const uri =
  "mongodb+srv://madhushri:QDWpVtfiyl9QcycQ@cluster0.awxk4zb.mongodb.net/?retryWrites=true&w=majority";

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     await client.connect();
//     await client.db("admin").command({ ping: 1 });
//     console.log("Connected to db");
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route middlewares
app.use("/api/user", authRoute);

app.listen(4040, () => {
  console.log("server started on port 4040");
});
