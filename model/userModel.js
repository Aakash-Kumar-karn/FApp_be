const mongoose = require("mongoose");
const { db_link } = require("../secret");
const validator = require("email-validator");

mongoose.connect(db_link).then(function () {
    console.log("database is connected");
}).catch(function (err) {
    console.log(err);
})

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        validate: function () {
            return validator.validate(this.email);
        }
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        min: 8,
        validate: function () {
            return this.confirmPassword == this.password;
        }
    },
    token:String,
    
})

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;