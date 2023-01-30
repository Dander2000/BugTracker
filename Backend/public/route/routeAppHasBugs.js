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
const { getBugs, getBug, getBugsBugType, getBugsApp, getBugsDeveloper, getBugsReporter, getBugsBugTypes, insertBugs, assignBug, getBugsSearch, finishBug } = require('./../database/databaseQuery');
// add: (details, appId, bugId, userId) =>
// 		requests.put(),
router.get(`/create/:details&:appId&:bugId&:userId`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const details = req.params.details;
    const appId = req.params.appId;
    const bugId = req.params.bugId;
    const userId = req.params.userId;
    insertBugs(res, details, appId, bugId, userId);
}));
router.get(`/assign/:bugId&:userId`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bugId = req.params.bugId;
    const userId = req.params.userId;
    assignBug(res, bugId, userId);
}));
router.get(`/finish/:bugId`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bugId = req.params.bugId;
    finishBug(res, bugId);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    getBug(res, id);
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    getBugs(res);
}));
router.get(`/bugtype/:tag&:term`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const term = req.params.term;
    let tag = req.params.tag;
    if (req.params.tag === "all") {
        tag = null;
    }
    getBugsSearch(res, term, tag);
}));
router.get('/bugtype/:bugtype', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.bugtype;
    getBugsBugType(res, id);
}));
router.get('/app/:app', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.app;
    getBugsApp(res, id);
}));
router.get('/programmer/:developer', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.developer;
    getBugsDeveloper(res, id);
}));
router.get('/user/:reporter', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.reporter;
    getBugsReporter(res, id);
}));
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('big no no there happend');
    next();
});
module.exports = router;
