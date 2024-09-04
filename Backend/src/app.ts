import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorhandler from './app/middleWares/globalErrorhandler';
import { notFountRoute } from './app/middleWares/notFountRoute';
// import cookieParser from 'cookie-parser'
const app:Application=express();

// parser
app.use(express.json());
// app.use(cookieParser());

app.use(cors({origin:"https://property-lovat.vercel.app",credentials:true}));


app.use('/api/v1',router)

app.get('/',async(req:Request,res:Response)=>{
    res.send('Hello user!')
})

app.use(globalErrorhandler);
app.use(notFountRoute);

export default app;
