import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const URI = process.env.MONGO_URI;
        if (!URI) throw new Error('Database tidak ada');
        await mongoose.connect(URI);
        console.log('Berhasil terhubung ke database');
    } catch (error) {
        console.error('Gagal terhubung ke database');
    }
}

export default connectDB;