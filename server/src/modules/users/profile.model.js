import mongoose from "mongoose";


const profileSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    displayName:{
        type: String,
        required: true,
    },
    phone:{
        type: Number,
    },
    avatarUrl:{
        type: String,
    },

},{timestamps: true});

profileSchema.index({userId: 1});

export const Profile = mongoose.model("Profile" , profileSchema);