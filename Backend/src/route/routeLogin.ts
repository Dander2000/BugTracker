import { NextFunction } from "express";
import { Response } from "express";

const express = require('express');
const router = express.Router();
const { getUser, getAuth, verifyAuthToken,insertUser } = require('./../database/databaseQuery');


// const jwt = require('jsonwebtoken');

router.get('/login/:mail&:pass', async (req:any, res:any) => {
	// router.post('/login', async (req:any, res:any) => {
	// req.body = ;
	// console.log(req.body);
    // const mail:any = req.body.mail;
    // const pass:any = req.body.pass;
    const mail:any = req.params.mail;
    const pass:any = req.params.pass;
    getAuth(res, mail, pass)
});

router.get('/register/:firstName&:surname&:mail&:pass&:nick', async (req:any, res:any) => {
	// router.post('/register', async (req:any, res:any) => {
	// req.body = ;
	// console.log(req.body);
    // const mail:any = req.body.mail;
    // const pass:any = req.body.pass;
    const firstName:any = req.params.firstName;
    const surname:any = req.params.surname;
    const nick:any = req.params.nick;
    const mail:any = req.params.mail;
    const pass:any = req.params.pass;
    insertUser(res, firstName, surname, nick, mail, pass);
	getAuth(mail, pass);
});

router.get('/register/:firstName&:surname&:mail&:pass', async (req:any, res:any) => {
	// router.post('/register', async (req:any, res:any) => {
	// req.body = ;
	// console.log(req.body);
	// const mail:any = req.body.mail;
	// const pass:any = req.body.pass;
	const firstName:any = req.params.firstName;
	const surname:any = req.params.surname;
	const mail:any = req.params.mail;
	const pass:any = req.params.pass;
	insertUser(res, firstName, surname, null, mail, pass);
	getAuth(mail, pass);
})

router.get('/:id', async (req: any, res: any) => {
    const id = req.params.id;
    getUser(res, id);
});

router.post('/', verifyAuthToken, async (req: any, res: any) => {
  	getUser(res,req.userId);
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('big no no there happend');
    next();
});

module.exports = router;