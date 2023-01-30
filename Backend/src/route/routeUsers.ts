import { NextFunction } from "express";
import { Response } from "express";

const express = require('express');
const router = express.Router();
const { getUsers, getUser, getSpecificUsers, getProgrammers, getMyAppHasSpecialists, getAdmin, getProgrammersToBug } = require('./../database/databaseQuery');

router.get('/', async (req: any, res: any) => {
    getUsers(res);
});

router.get('/bug/:bug', async (req: any, res: any) => {
	const id = req.params.bug;
    getProgrammersToBug(res,id);
});

router.get('/programmer', async (req:any, res:any) => {
	getProgrammers(res);
});

router.get('/programmer/:opus', async (req:any, res:any) => {
	const id = req.params.opus;
	getMyAppHasSpecialists(res,id);
});

router.get('/admin', async (req:any, res:any) => {
	getAdmin(res);
});


router.get('/:id', async (req: any, res: any) => {
	const id = req.params.id;
    getUser(res, id);
});

router.get('/:id&:others', async (req: any, res: any) => {
	const others = req.params.others.split('&')
	const id = [req.params.id, ...others];
	console.log(id)
	getSpecificUsers(res, id);
	
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('big no no there happend');
    next();
});

module.exports = router;