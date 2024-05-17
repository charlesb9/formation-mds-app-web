const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: __dirname + "/../.env.local" });

const app = express();
const port = 3000;

app.use(express.json());

const user = encodeURIComponent(process.env.DB_USER);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const address = process.env.DB_ADDRESS;
const dbName = process.env.DB_NAME;

const url = `mongodb://${user}:${password}@${address}/${dbName}`;
console.log(url)

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(url); // Suppression des options obsolètes
  console.log("Connected to MongoDB");
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(require("./middleware/checkJWT"));
app.use("/user", require("./routes/user.route"));
app.use("/auth", require("./routes/auth.route"));
app.use("/task", require("./routes/task.route"));
app.use("/project", require("./routes/project.route"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
