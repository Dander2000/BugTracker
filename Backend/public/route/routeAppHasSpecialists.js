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
const { getMyAppsHasSpecialists, getMyAppHasSpecialists } = require('./../database/databaseQuery');
router.get('/:app', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.app;
    getMyAppHasSpecialists(res, id);
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    getMyAppsHasSpecialists(res);
}));
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('big no no there happend');
    next();
});
module.exports = router;
