import mongoose from "mongoose";
import { User } from "../users/user.model";
import { Store } from "../stores/store.model";
import { Product } from "../products/product.model";
const cartItemSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    storeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        required: true,
    },
    quantity:{
        type: Number,
        min: 1,
        required: true
    },
},{timestamps: true});

cartItemSchema.index({ userId: 1 });
cartItemSchema.index({ userId: 1 , productId: 1});

export const Store = mongoose.model("CartItem", cartItemSchema);