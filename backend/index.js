import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'
const port = process.env.PORT || 5000
import userRouter from "./routes/userAuth.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

connectDB();
const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
// app.use(notFound);
app.use(errorHandler);

app.use('/api/users', userRouter)

app.get('/', (req, res) => {
    res.send('server')
})

app.listen(port, () => console.log(`server running at ${port}`))

