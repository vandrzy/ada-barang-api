import mongoose from "mongoose";

export interface CategoryInterface{
    _id: mongoose.Types.ObjectId;
    name: string;
    isActive: boolean;
    shortCode: string;
    createdAt: Date;
    updatedAt: Date;
}

const categoryShcema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    shortCode: {
        type: String,
        unique: true,
        required: true, 
        index: true
    }
},{
    timestamps: true
})

const Category = mongoose.model<CategoryInterface>('Category', categoryShcema);

export default Category;