import mongoose, { Document } from "mongoose";

export interface ProductInterface extends Document{
    name: string;
    description?: string;
    shortCode: string;
    imagePublicId: string;
    imagePublicUrl: string;
    categories: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    shortCode: {
        type: String,
        required: true
    },
    imagePublicId: {
        type: String,
        required: true
    },
    imagePublicUrl: {
        type: String,
        required: true
    },
    categories: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
        default: []
    }
},{
    timestamps: true
});

const Product = mongoose.model<ProductInterface>('Product', productSchema);
export default Product;