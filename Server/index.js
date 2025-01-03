import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './Routes/user.js';
import workspaceRouter from './Routes/workspace.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.json("Server is handling get request here");
})

mongoose.connect(`${process.env.DATABASE_URL}`)
 .then(()=> console.log("Connected to Database")).catch((e)=> console.log(e.code + `${" "} Error in connecting to Database`));

app.use("/api/v1/user", userRouter);
app.use('/api/v1/workspace', workspaceRouter);

app.listen(3000);