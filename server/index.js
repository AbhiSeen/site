import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express';
import {Connection} from './database/db.js';
import Router from  './controller/main-controller..js'
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());
app.use('/', Router);


const PORT = 8000;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
Connection(USERNAME,PASSWORD);


app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));

// DefaultData();
 