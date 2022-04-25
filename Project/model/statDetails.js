const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statSchema = new Schema({
    uName: {
        type: String,
        unique: true,
        required: true
    },
    played: {
        type: Array,
        default: [0,0,0]
    },
    wins: {
        type: Array,
        default: [0,0,0]
    },
    losses: {
        type: Array,
        default: [0,0,0]
    }
});

module.exports = mongoose.model("StatDetails", statSchema);