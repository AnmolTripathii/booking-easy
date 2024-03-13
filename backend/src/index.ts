import express,{Request,Response} from 'express'
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoutes from './Routes/users';
import authRoutes from './Routes/auth'
import cookieParser from 'cookie-parser'
import path from 'path';

const app=express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
}));

mongoose.connect(process.env.MONGO_DB as string);

app.use(express.static(path.join(__dirname,"../../frontend/dist")))

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);

app.listen(7000,()=>{
    console.log("server is running");
})




// mongoose.connect(process.env.MONGO_DB as string)
//   .then(() => {
//     console.log('Connected to MongoDB');
//     // Start the server
//     const port = process.env.PORT || 5000;
//     app.listen(port, () => {
//       console.log(`Server is running on port ${port}`);
//     });
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB", error);
//   });