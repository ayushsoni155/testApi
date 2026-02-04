const express = require("express");
const connectDB = require("./config/db.config");
const Quotes = require("./models/quotes.model");

const app = express();
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, user go to /quote to get a random quote");
});

app.get("/quote", async (req, res) => {
  try {
    const randomQuote = await Quotes.aggregate([{ $sample: { size: 1 } }]);
    if (!randomQuote) {
      return res.status(404).json({ message: "No quotes found" });
    }
    res.status(200).json({
      message: "Quote retrieved successfully!",
      data: {
        Quote: randomQuote[0].quote,
        author: randomQuote[0].author,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error retrieving quote", error: err.message });
  }
});

app.post("/quote", async (req, res) => {
  try {
    const data = req.body;
    const newQuote = await Quotes.create({
      quote: data.quote,
      author: data.author,
    });

    res.status(201).json({
      message: "Quote created successfully!",
      data: newQuote,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error creating quote", error: err.message });
  }
});

module.exports = app;
