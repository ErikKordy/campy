const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
    username: String, 
    email: {
        type: String,
        required: true,
        unique: true
    }
});
userSchema.plugin(passportLocalMongoose, {
    usernameField: 'username', 
});

module.exports = mongoose.model('User', userSchema)