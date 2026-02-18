import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());



app.listen(PORT, () => {
    console.log("Berjalan pada server: ", PORT);
    
})