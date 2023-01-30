import { NextFunction } from "express";
import { Response } from "express";

const express = require('express');
const router = express.Router();
const { getBugs,
	getBug,
	getBugsBugType, 
	getBugsApp,
	getBugsDeveloper,
	getBugsReporter, 
	getBugsBugTypes,
	insertBugs,
	assignBug,
	getBugsSearch,
	finishBug
} = require('./../database/databaseQuery');

// add: (details, appId, bugId, userId) =>
// 		requests.put(),

router.get(`/create/:details&:appId&:bugId&:userId`, async (req: any, res: any) => {
	const details = req.params.details;
	const appId   = req.params.appId;
	const bugId   = req.params.bugId;
	const userId  = req.params.userId;
    insertBugs(res, details, appId, bugId, userId);
});

router.get(`/assign/:bugId&:userId`, async (req: any, res: any) => {
	const bugId   = req.params.bugId;
	const userId  = req.params.userId;
    assignBug(res, bugId, userId);
});

router.get(`/finish/:bugId`, async (req: any, res: any) => {
	const bugId = req.params.bugId;
    finishBug(res, bugId);
});

router.get('/:id', async (req: any, res: any) => {
	const id = req.params.id;
    getBug(res, id);
});

router.get('/', async (req: any, res: any) => {
	getBugs(res);
});

router.get(`/bugtype/:tag&:term`, async (req: any, res: any) => {
	const term = req.params.term;
	let tag = req.params.tag;
	if (req.params.tag === "all") {
		tag = null;
	}
	getBugsSearch(res, term, tag);
});

router.get('/bugtype/:bugtype', async (req: any, res: any) => {
    const id = req.params.bugtype;
    getBugsBugType(res, id);
});

router.get('/app/:app', async (req: any, res: any) => {
    const id = req.params.app;
    getBugsApp(res, id);
});

router.get('/programmer/:developer', async (req: any, res: any) => {
    const id = req.params.developer;
    getBugsDeveloper(res, id);
});

router.get('/user/:reporter', async (req: any, res: any) => {
    const id = req.params.reporter;
    getBugsReporter(res, id);
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('big no no there happend');
    next();
});

module.exports = router;