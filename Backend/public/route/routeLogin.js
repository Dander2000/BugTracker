"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const { getUser, getAuth, verifyAuthToken, insertUser } = require('./../database/databaseQuery');
// const jwt = require('jsonwebtoken');
router.get('/login/:mail&:pass', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // router.post('/login', async (req:any, res:any) => {
    // req.body = ;
    // console.log(req.body);
    // const mail:any = req.body.mail;
    // const pass:any = req.body.pass;
    const mail = req.params.mail;
    const pass = req.params.pass;
    getAuth(res, mail, pass);
}));
router.get('/register/:firstName&:surname&:mail&:pass&:nick', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // router.post('/register', async (req:any, res:any) => {
    // req.body = ;
    // console.log(req.body);
    // const mail:any = req.body.mail;
    // const pass:any = req.body.pass;
    const firstName = req.params.firstName;
    const surname = req.params.surname;
    const nick = req.params.nick;
    const mail = req.params.mail;
    const pass = req.params.pass;
    insertUser(res, firstName, surname, nick, mail, pass);
    getAuth(mail, pass);
}));
router.get('/register/:firstName&:surname&:mail&:pass', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // router.post('/register', async (req:any, res:any) => {
    // req.body = ;
    // console.log(req.body);
    // const mail:any = req.body.mail;
    // const pass:any = req.body.pass;
    const firstName = req.params.firstName;
    const surname = req.params.surname;
    const mail = req.params.mail;
    const pass = req.params.pass;
    insertUser(res, firstName, surname, null, mail, pass);
    getAuth(mail, pass);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    getUser(res, id);
}));
router.post('/', verifyAuthToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    getUser(res, req.userId);
}));
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('big no no there happend');
    next();
});
module.exports = router;
