const express = require("express");
const quotesRouter = require("./routes/quotes.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, user go to /quote to get a random quote");
});
app.use("/api", quotesRouter);

module.exports = app;
