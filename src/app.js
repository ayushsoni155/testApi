const express = require("express");
const fs = require('fs');
const app = express();
app.use(express.json());

const quotes = JSON.parse(fs.readFileSync('./src/data.json', 'utf-8'));

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
   fs.writeFileSync('./data.json', JSON.stringify(quotes, null, 2));
  res.status(201).json({
    message: "Quote revived successfully!",
    data: data,
  });
});

module.exports = app;
