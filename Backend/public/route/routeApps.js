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
const { getMyApps, getMyApp, getMyAppsHasSpecialist, insertApp, assignApp, changeStateApp } = require('./../database/databaseQuery');
router.get('/create/:name&:description', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.params.name;
    const description = req.params.description;
    insertApp(res, name, description);
}));
router.get('/upgrade/:id&:appState', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const appState = req.params.appState === '7' ? 7 : parseInt(req.params.appState, 10) + 1;
    changeStateApp(res, id, appState);
}));
router.get('/downgrade/:id&:appState', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const appState = req.params.appState === '1' ? 1 : parseInt(req.params.appState, 10) - 1;
    changeStateApp(res, id, appState);
}));
router.get(`/assign/:appId&:userId`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("id did assign, at least tried...");
    const appId = req.params.appId;
    const userId = req.params.userId;
    assignApp(res, appId, userId);
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    getMyApps(res);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    getMyApp(res, id);
}));
router.get('/programmer/:author', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.author;
    getMyAppsHasSpecialist(res, id);
}));
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('big no no there happend');
    next();
});
module.exports = router;
