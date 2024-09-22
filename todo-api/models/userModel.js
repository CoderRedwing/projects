const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowerCase: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6

    },

}, {
    timestamps: true,

});

userSchema.pre('save',async function (next) {
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
    
});

userSchema.method.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);

    
};

const User = mongoose.model('User',userSchema);

module.exports = User;