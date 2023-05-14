import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 20
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    referrals:{
        type:Array,
    },
    orders:{
        type:Array,
    },
    sessions:{type:Array},
    referralCode:{type:String}
});

const user = mongoose.model('user', userSchema);

export default user;