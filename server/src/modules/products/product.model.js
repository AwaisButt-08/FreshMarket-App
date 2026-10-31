import mongoose from "mongoose";


const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true,
        enum:["produce", "dairy", "bakery", "pantry", "frozen"]
    },
    price:{
        type: Number,
        required: true
    },
    weightOrQuantity:{
        type: Number,
    },
    stockQty:{
        type: Number,
        default: 0,
        min: 0,
    },
    unit:{
        type: String,
        required: true,
        enum:["each", "bunch", "kg", "g", "L", "ml", "pack"]
    },
    description:{
        type: String,
    },
    isPerishable:{
        type: Boolean,
        required: true,
        default: false,
    },
   isPublished:{
        type: Boolean,
        required: true,
        default: false,
    },
    storeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        required: true,
    },
    imageUrl:{
        type: String,
        default: null,
    },
},{timestamps: true});


productSchema.index({ storeId: 1 });
productSchema.index({ storeId: 1, isPublished: 1 });

export const Product = mongoose.model("Product", productSchema);