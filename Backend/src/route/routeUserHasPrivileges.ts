import { NextFunction } from "express";
import { Response } from "express";

const express = require('express');
const router = express.Router();
const { getUserPrivileges, getUserPrivilege } = require('./../database/databaseQuery');

router.get('/', async (req: any, res: any) => {
    getUserPrivileges(res);
});

router.get('/:id', async (req: any, res: any) => {
    const id = req.params.id;
    getUserPrivilege(res, id);
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('big no no there happend');
    next();
});

module.exports = router;