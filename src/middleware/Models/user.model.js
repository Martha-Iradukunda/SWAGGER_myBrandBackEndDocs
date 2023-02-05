import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    repeatPassword: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: "user"
    },

    isVerified: {
        type: String,
        default: "false"
    },

    dateCreated: {
        type: 'date',
        default: Date.now()

    }
})

const User = mongoose.model('User', userSchema)
export default User