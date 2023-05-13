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
module.exports.getMyApps = (response) => __awaiter(void 0, void 0, void 0, function* () {
    databaseConnection_js_1.pool.query(`SELECT
    * 
    FROM
    app`, function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"apps\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.getMyApp = (response, id) => __awaiter(void 0, void 0, void 0, function* () {
    databaseConnection_js_1.pool.query(`SELECT
    * 
    FROM
    app
    WHERE
    idApp = ?`, [id], function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"apps\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.getMyAppsHasSpecialist = (response, id) => __awaiter(void 0, void 0, void 0, function* () {
    databaseConnection_js_1.pool.query(`SELECT
    * 
    FROM
    apps_of_programmer
    WHERE
    User_idUser = ?`, [id], function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"programmers\":' + JSON.stringify(r) + '}')));
    });
});
