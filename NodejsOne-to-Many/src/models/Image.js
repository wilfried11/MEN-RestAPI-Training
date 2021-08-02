const mongoose = require('mongoose');

const Image = mongoose.model(
    "Image",
    new mongoose.Schema({
        path: String,
        url: String,
        caption: String,
        createAt: Date
    })
);

module.exports = Image;

