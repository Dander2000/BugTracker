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
const databaseConnection_js_1 = require("./databaseConnection.js");
module.exports.getBugTypes = (response) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`SELECT
    * 
    FROM
    bugtype`, function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"bugtypes\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.getBugType = (response, id) => __awaiter(void 0, void 0, void 0, function* () {
    databaseConnection_js_1.pool.query(`SELECT
    * 
    FROM
    bugtype
    WHERE
    idBug = ?`, [id], function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"bugtypes\":' + JSON.stringify(r) + '}')));
    });
});
