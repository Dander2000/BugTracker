'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const database = require('./databaseConnection.js');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
module.exports.getAuth = (response, mail, pass) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`SELECT
    * 
    FROM
    user
    WHERE
    mail = ?`, [mail], function (e, r, f) {
        if (e)
            throw e;
        console.log("my R is :", r, mail, pass);
        if (r.length === 0) {
            response.send({ errors: 'No such a user' });
        }
        else if (r[0].password === pass) {
            const token = jwt.sign({}, "xd", { expiresIn: 600 });
            response.send({
                errors: '',
                token: token,
                user: r
            });
        }
        else {
            response.send({ errors: 'Invalid password' });
        }
    });
});
