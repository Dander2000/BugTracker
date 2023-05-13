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
module.exports.insertBugs = (response, details, appId, bugId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    databaseConnection_js_1.pool.query(`INSERT INTO app_has_bug
    (idBug, appId, bugId, ProgressingBy, details, finished, createdBy, createdAt, lastUpdate)
	VALUES
    (default, ${appId}, ${bugId}, null, \'${details}\', default, ${userId}, now(), now())`, function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"Succes\":' + JSON.stringify(r) + '}')));
    });
});
