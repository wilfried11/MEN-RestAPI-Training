const mongoose = require('mongoose');

const CustomerSchema = require('./Customer').CustomerSchema;

const Identifier = mongoose.model(
    "Identifier",
    new mongoose.Schema({
        cardcode:   String,
        customer:   CustomerSchema
    })
);

module.exports = Identifier;
