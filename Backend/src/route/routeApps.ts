import { NextFunction } from "express";
import { Response } from "express";

const express = require('express');
const router = express.Router();
const { getMyApps, getMyApp, getMyAppsHasSpecialist,insertApp,assignApp,changeStateApp } = require('./../database/databaseQuery');



router.get('/create/:name&:description', async (req:any, res:any) => {
	const name = req.params.name;
	const description = req.params.description;
    insertApp(res,name,description);
});

router.get('/upgrade/:id&:appState', async (req:any, res:any) => {
	const id = req.params.id;
	const appState = req.params.appState === '7' ? 7 : parseInt(req.params.appState,10)+1;
    changeStateApp(res,id,appState);
});

router.get('/downgrade/:id&:appState', async (req:any, res:any) => {
	const id = req.params.id;
	const appState = req.params.appState === '1' ? 1 : parseInt(req.params.appState,10)-1;
    changeStateApp(res,id,appState);
});

router.get(`/assign/:appId&:userId`, async (req: any, res: any) => {
	console.log("id did assign, at least tried...");
	
	const appId   = req.params.appId;
	const userId  = req.params.userId;
    assignApp(res, appId, userId);
});

router.get('/', async (req:any, res:any) => {
    getMyApps(res);
});

router.get('/:id', async (req:any, res:any) => {
    const id = req.params.id;
    getMyApp(res,id);
});

router.get('/programmer/:author', async (req:any, res:any) => {
    const id = req.params.author;
    getMyAppsHasSpecialist(res,id);
});

router.use((err:Error, req:Request, res:Response, next:NextFunction) =>{
    console.error(err.stack);
    res.status(500).send('big no no there happend');
    next();
});

module.exports = router;