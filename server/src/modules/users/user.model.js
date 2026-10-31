import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    passwordHash:{
        type: String,
        required: true,
        minlength: 60,
        maxlength: 60,
    },
    role:{
       type: String,
       enum:["vendor","customer"],
       required: true,
    },   
    isVerified:{
        type: Boolean,
        required: true,
        default: false,
    },
    otp: {
        type: String,
        default: null
    },
    otpExpiresAt: {
        type: Date,
        default: null
    },

    refreshTokenHash: {
        type: String,
        default: null,
    },
    accessToken: {
        type: String,
        default: null,
    }
    
},{
    timestamps: true,
});

userSchema.index({email: 1});

export const User = mongoose.model("User", userSchema);