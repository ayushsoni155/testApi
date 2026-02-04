const Quotes = require("../models/quotes.model");

class QuotesController {
  getAQuote = async (req, res) => {
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
  };
  setAQuote = async (req, res) => {
    try {
      const { quote, author } = req.body;
      const newQuote = await Quotes.create({
        quote,
        author,
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
  };
}
module.exports = new QuotesController();
