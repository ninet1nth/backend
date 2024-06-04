import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import cors from 'cors';

import {registerValidation,loginValidation} from './validations.js'

import UserModel from './models/User.js'
import checkAuth from './utils/checkAuth.js'
import User from './models/User.js';

import * as UserController from './controllers/UserController.js'

import config from 'config';


mongoose
.connect('mongodb+srv://lusha:21iliYa21@cluster0.tkkx0bk.mongodb.net/mern?retryWrites=true&w=majority&appName=Cluster0',)
.then(() => console.log('DB started'))
.catch((err) => console.log('DB error', err));


const app = express();
const PORT = config.get('port');

app.use(express.json());
app.use(cors());


app.post('/login',loginValidation,UserController.login);
app.post('/register',registerValidation, UserController.register);
app.get('/me', checkAuth, UserController.getMe);
app.post('/dateRecording',UserController.dateRecording);
app.get('/services', UserController.getServices);
app.get('/dateRecording', UserController.getDateTime);

app.listen(PORT, (err) =>{
     
    if (err){
        return console.log(err);
    }

    console.log(`Server is started on port ${PORT}`);
});

