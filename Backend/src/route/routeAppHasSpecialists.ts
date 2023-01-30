import { NextFunction } from "express";
import { Response } from "express";

const express = require('express');
const router = express.Router();
const { getMyAppsHasSpecialists, getMyAppHasSpecialists } = require('./../database/databaseQuery');

router.get('/:app', async (req: any, res: any) => {
    const id = req.params.app;
    getMyAppHasSpecialists(res, id);
});

router.get('/', async (req: any, res: any) => {
    getMyAppsHasSpecialists(res);
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('big no no there happend');
    next();
});

module.exports = router;