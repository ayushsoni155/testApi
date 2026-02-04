const mongoose = require('mongoose');

const quotesSchema = new mongoose.Schema({
    quote: {
        type: String,
         unique: true,
        required: true,
    },
    author:{
        type: String,
        required: true,
    }
});
const Quotes = mongoose.model('Quotes', quotesSchema);
module.exports = Quotes;