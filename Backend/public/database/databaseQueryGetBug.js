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
module.exports.getBugs = (response) => __awaiter(void 0, void 0, void 0, function* () {
    databaseConnection_js_1.pool.query(`SELECT
    * 
    FROM
    bugs ORDER BY idBug DESC
    LIMIT 5`, function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"bugs\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.getBug = (response, id) => __awaiter(void 0, void 0, void 0, function* () {
    databaseConnection_js_1.pool.query(`SELECT
    * 
    FROM
    bugs
    WHERE
    idBug = ${id} ORDER BY idBug DESC`, function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"bugs\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.getBugsBugType = (response, id) => __awaiter(void 0, void 0, void 0, function* () {
    databaseConnection_js_1.pool.query(`SELECT
    * 
    FROM
    bugs
    WHERE
    bugId = ${id} ORDER BY idBug DESC`, function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"bugs\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.getBugsDeveloper = (response, id) => __awaiter(void 0, void 0, void 0, function* () {
    databaseConnection_js_1.pool.query(`SELECT
    * 
    FROM
    bugs
    WHERE
    progressingBy = ${id} ORDER BY idBug DESC`, function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"bugs\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.getBugsReporter = (response, id) => __awaiter(void 0, void 0, void 0, function* () {
    databaseConnection_js_1.pool.query(`SELECT
    * 
    FROM
    bugs
    WHERE
    createdBy = ${id} ORDER BY idBug DESC`, function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"bugs\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.getBugsApp = (response, id) => __awaiter(void 0, void 0, void 0, function* () {
    databaseConnection_js_1.pool.query(`SELECT
    * 
    FROM
    bugs
    WHERE
    appId = ${id} ORDER BY idBug DESC`, function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"bugs\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.getBugsSearch = (response, id, tag, offset) => __awaiter(void 0, void 0, void 0, function* () {
    if (tag) {
        databaseConnection_js_1.pool.query(`SELECT
    	* 
    	FROM
    	bugs
    	WHERE
    	details LIKE \'\%${id}\%\' AND title = \'${tag}\' 
        ORDER BY idBug DESC LIMIT 5 OFFSET ${offset}`, function (e, r, f) {
            if (e)
                throw e;
            databaseConnection_js_1.pool.query(`SELECT
    	    COUNT(*) as counter
    	    FROM
    	    bugs
    	    WHERE
    	    details LIKE \'\%${id}\%\' AND title = \'${tag}\' `, function (er, re, fu) {
                response.send(JSON.parse(('{\"bugs\":' + JSON.stringify(r) + ',\"counter\":' + JSON.stringify(re) + '}')));
            });
        });
    }
    else {
        databaseConnection_js_1.pool.query(`SELECT
		* 
		FROM
		bugs
		WHERE
		details LIKE \'\%${id}\%\' 
        ORDER BY idBug DESC LIMIT 5 OFFSET ${offset}`, function (e, r, f) {
            if (e)
                throw e;
            databaseConnection_js_1.pool.query(`SELECT
    	    COUNT(*) as counter
    	    FROM
    	    bugs
    	    WHERE
    	    details LIKE \'\%${id}\%\'`, function (er, re, fu) {
                response.send(JSON.parse(('{\"bugs\":' + JSON.stringify(r) + ',\"counter\":' + JSON.stringify(re) + '}')));
            });
        });
    }
});
