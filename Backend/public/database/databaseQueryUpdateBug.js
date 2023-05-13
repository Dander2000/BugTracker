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
module.exports.assignBug = (response, bugId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    databaseConnection_js_1.pool.query(`UPDATE app_has_bug SET
    ProgressingBy = ${userId}
	WHERE idBug = ${bugId}`, function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"Succes\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.finishBug = (response, bugId) => __awaiter(void 0, void 0, void 0, function* () {
    databaseConnection_js_1.pool.query(`UPDATE app_has_bug 
	SET finished = 1 
	WHERE idBug = ${bugId}`, function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"Succes\":' + JSON.stringify(r) + '}')));
    });
});