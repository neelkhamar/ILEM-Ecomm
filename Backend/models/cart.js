const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartScehma = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Cart', CartScehma);