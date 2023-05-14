import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express';
import {Connection} from './database/db.js';
import Router from  './controller/main-controller..js'
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

app.use(express.json());
app.use(cors({origin:"http://localhost:3000",credentials:true}));
app.use(cookieParser())
app.use('/', Router);

const PORT = 8000;
Connection(USERNAME,PASSWORD);


app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));

// DefaultData();
 