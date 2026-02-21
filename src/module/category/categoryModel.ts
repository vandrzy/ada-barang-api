import mongoose from "mongoose";

export interface CategoryInterface{
    _id: mongoose.Types.ObjectId;
    name: string;
    isActive: string;
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
    }
},{
    timestamps: true
})

const Category = mongoose.model<CategoryInterface>('Category', categoryShcema);

export default Category;