const express = require("express");
const app = express();
app.use(express.json());
const quotes = [];
app.get("/", (req, res) => {
  res.send("Hello, user");
});

app.get("/quote", (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
   res.status(200).json({
    message: "Quote retrieved successfully!",
    data: randomQuote
  });
});

app.post("/quote", (req, res) => {
  const data = req.body;
  quotes.push(data);
  res.status(201).json({
    message: "Quote revived successfully!",
    data: data,
  });
});

module.exports = app;
