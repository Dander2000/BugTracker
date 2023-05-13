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
module.exports.insertUser = (response, firstName, surname, nick, mail, pass) => __awaiter(void 0, void 0, void 0, function* () {
    if (!nick) {
        databaseConnection_js_1.pool.query(`INSERT INTO user
			(idUser, firstName, surname, mail, password, nick, createdBy,createdAt, lastUpdatedAt, lastUpdatedBy)
			VALUES
			(default, '${firstName}', '${surname}', '${mail}', '${pass}', null, 1 ,now(), now(), 1)`, function (e, r, f) {
            if (e)
                throw e;
            databaseConnection_js_1.pool.query(`UPDATE user
					SET lastUpdatedBy=@@IDENTITY, createdBy=@@IDENTITY 
					WHERE idUser=@@IDENTITY;`, function (e, r, f) {
                if (e)
                    throw e;
            });
        });
    }
    else {
        databaseConnection_js_1.pool.query(`INSERT INTO user
			(idUser, firstName, surname, mail, password, nick, createdBy,createdAt, lastUpdatedAt, lastUpdatedBy)
			VALUES
			(default, '${firstName}', '${surname}', '${mail}', '${pass}', '${nick}', 1 ,now(), now(), 1)`, function (e, r, f) {
            if (e)
                throw e;
            databaseConnection_js_1.pool.query(`UPDATE user
					SET lastUpdatedBy=@@IDENTITY, createdBy=@@IDENTITY 
					WHERE idUser=@@IDENTITY;`, function (e, r, f) {
                if (e)
                    throw e;
            });
        });
    }
    ;
});
// TODO SELECT BEFORE UPDATE TO GET ID OF NEW USER INSTED OF @@IDENITTY
