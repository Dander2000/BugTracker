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
// NOW
router.get(`/bugtype/:tag&:term&:page`, async (req: any, res: any) => {
	const term = req.params.term === undefined ? " ": req.params.term;
	
	let page = req.params.page;
	if (req.params.page === "") {
		page = 0;
	}
	let tag = req.params.tag;
	if (req.params.tag === "all") {
		tag = null;
	}
	console.log(term,page,tag);
	const offset = parseInt(page) * 5;
	getBugsSearch(res, term, tag, offset);
});
// NOW
router.get('/bugtype/:bugtype', async (req: any, res: any) => {
    const id = req.params.bugtype;
	// let page = req.params.page;
	// if (req.params.page === "") {
	// 	page = 0;
	// }
	// const offset = page * 10;
    getBugsBugType(res, id);//offset
});
// NOW
router.get('/app/:app', async (req: any, res: any) => {
    const id = req.params.app;
	// let page = req.params.page;
	// if (req.params.page === "") {
	// 	page = 0;
	// }
	// const offset = page * 10;
    getBugsApp(res, id);//offset
});
// NOW
router.get('/programmer/:developer', async (req: any, res: any) => {
    const id = req.params.developer;
	// let page = req.params.page;
	// if (req.params.page === "") {
	// 	page = 0;
	// }
	// const offset = page * 10;
    getBugsDeveloper(res, id);//
});
// NOW
router.get('/user/:reporter', async (req: any, res: any) => {
    const id = req.params.reporter;
	// let page = req.params.page;
	// if (req.params.page === "") {
	// 	page = 0;
	// }
	// const offset = page * 10;
    getBugsReporter(res, id);//offset
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('big no no there happend');
    next();
});

module.exports = router;