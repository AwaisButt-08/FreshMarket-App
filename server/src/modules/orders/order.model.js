import mongoose from "mongoose";
import { Store } from "../stores/store.model";
import { User } from "../users/user.model";

const orderSchema = mongoose.Schema({
    subtotal:{
        type: Number,
        required: true
    },
    orderItems:{
        type: [{
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            nameAtPurchase:{
                type: String,
                required: true,
            },
            unitAtPurchase:{
                type: String,
                required: true,
            },
            priceAtPurchase:{
                type: Number,
                required: true,
            },
            quantity:{
                type: Number,
                required: true,
                min:1,
            },
            lineTotal:{
                type: Number,
                required: true,
            },

    }],
        required: true,
    },
    status:{
        type: String,
        required: true,
        enum:["cancelled","dispatched","packed","pending "]
    },
    paymentStatus:{
        type: String,
        required: true,
        enum:["pending","paid","failed"]
    },
    storeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        required: true,
    },
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    stripePaymentIntentId:{
        type: String,
    },
},{timestamps: true});

export const Order = mongoose.model("Order", orderSchema);