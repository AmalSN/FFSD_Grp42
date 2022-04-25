const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    uName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    fName: String,
    lName: String,
    age: Number,
    gender: String
});

module.exports = mongoose.model("UserDetails", userSchema);