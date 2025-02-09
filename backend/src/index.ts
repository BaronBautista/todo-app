import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { response } from 'express';
import morgan from 'morgan';
import connectToMongoDB from './db/db.connect';

import authRoute from "./routes/auth/auth.route";
import noteRoute from "./routes/noteRoutes";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

const origins = process.env.CORS_ORIGINS
  ? JSON.parse(process.env.CORS_ORIGINS)
  : [];
app.use(
  cors({
    origin: origins,
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res)=> {
  res.status(200).json({ message: "Server is Running"})
}) 

app.use("/api", noteRoute)
app.use("/api", authRoute)

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
  });