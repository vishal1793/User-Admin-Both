const mongoose = require("mongoose")
const schema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type:String,
        default:"user"
    }
})

module.exports = mongoose.model("userCollection", schema)