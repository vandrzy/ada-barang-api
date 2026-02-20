import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import globalErrorHandler from './util/globalErrorHandler';
import authRoute from './module/auth/authRoute';
import cokkieParser from 'cookie-parser';
dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(cokkieParser());
app.use('/api/auth', authRoute);


app.use(globalErrorHandler);
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Berjalan pada server: ", PORT);
    })
}).catch((error) => {
    console.error('Error: ', error.name);
    console.error(error.message);
})