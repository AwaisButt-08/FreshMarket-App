import mongoose from "mongoose";
import { User } from "../users/user.model";


const storeSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    address:{
        type: String,
    },
    logoUrl:{
        type: String,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isActive:{
        type: Boolean,
        default: true,
        required: true
    },
},{timestamps: true});

storeSchema.index({ userId: 1 }, { unique: true });
storeSchema.index({ slug: 1 }, { unique: true });

export const Store = mongoose.model("Store", storeSchema);