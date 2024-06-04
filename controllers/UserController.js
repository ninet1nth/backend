import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js'
import Services from '../models/Services.js';
import DateRecording from '../models/DateRecording.js';
import axios from 'axios';
import DateTime from '../models/DateTime.js';



export const getServices = async (req, res) => {
    try {
        const services = await Services.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getDateTime = async (req, res) => {
    try {
       
        const { date, time } = req.query;

        
        const records = await DateTime.find({ date, time });

        if (records.length > 0) {
            
            res.status(400).json({ message: 'Время уже занято' });
        } else {
            
            res.status(200).json({ message: 'Время свободно, вы успешно записались!' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const dateRecording = async(req,res)=>{
    
    const record = new DateRecording({
        userName: req.body.userName,
        serviceName: req.body.serviceName,
        price: req.body.price,
        date: req.body.date,
        time: req.body.time
    });

    
    try {
        const savedRecord = await record.save();
        res.json(savedRecord);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const register = async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign({ _id: user._id, }, '0372', { expiresIn: '30d', },);

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,

        });

    } catch (err) {
        console.log('err');
        res.status(500).json({
            message: 'Не удалось зарегистрироваться',
        });

    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if (!isValidPass) {
            return res.status(400).json({
                message: 'Неверный логин или пароль',
            });
        }

        const token = jwt.sign({
            _id: user._id,
        },
            '0372',
            {
                expiresIn: '30d',
            },
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,


        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось войти',
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            });
        }


        const { passwordHash, ...userData } = user._doc;

        res.json(userData);


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Нет доступа',
        });
    }
};


