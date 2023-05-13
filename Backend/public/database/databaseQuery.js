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
/** PRZENIESIONE */
//#region 
module.exports.insertBugs = (response, details, appId, bugId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`INSERT INTO app_has_bug
    (idBug, appId, bugId, ProgressingBy, details, finished, createdBy, createdAt, lastUpdate)
	VALUES
    (default, ${appId}, ${bugId}, null, \'${details}\', default, ${userId}, now(), now())`, function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"Succes\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.insertApp = (response, name, description) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`INSERT INTO app
	(idApp,name,description,appState)
	VALUES 
	(default,\'${name}\',\'${description}\',1)`, function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"Succes\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.assignBug = (response, bugId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`UPDATE app_has_bug SET
    ProgressingBy = ${userId}
	WHERE idBug = ${bugId}`, function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"Succes\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.assignApp = (response, appId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`INSERT INTO app_has_specialist 
    ( App_idApp, User_idUser )
    VALUES(
    ${appId}, ${userId})`, function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"Succes\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.changeStateApp = (response, appId, newAppState) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`UPDATE app SET
	appState=${newAppState} WHERE idApp=${appId}`, function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"Succes\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.finishBug = (response, bugId) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`UPDATE app_has_bug 
	SET finished = 1 
	WHERE idBug = ${bugId}`, function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"Succes\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.insertUser = (response, firstName, surname, nick, mail, pass) => __awaiter(void 0, void 0, void 0, function* () {
    if (!nick) {
        database.pool.query(`INSERT INTO user
			(idUser, firstName, surname, mail, password, nick, createdBy,createdAt, lastUpdatedAt, lastUpdatedBy)
			VALUES
			(default, '${firstName}', '${surname}', '${mail}', '${pass}', null, 1 ,now(), now(), 1)`, function (e, r, f) {
            if (e)
                throw e;
            database.pool.query(`UPDATE user
					SET lastUpdatedBy=@@IDENTITY, createdBy=@@IDENTITY 
					WHERE idUser=@@IDENTITY;`, function (e, r, f) {
                if (e)
                    throw e;
            });
        });
    }
    else {
        database.pool.query(`INSERT INTO user
			(idUser, firstName, surname, mail, password, nick, createdBy,createdAt, lastUpdatedAt, lastUpdatedBy)
			VALUES
			(default, '${firstName}', '${surname}', '${mail}', '${pass}', '${nick}', 1 ,now(), now(), 1)`, function (e, r, f) {
            if (e)
                throw e;
            database.pool.query(`UPDATE user
					SET lastUpdatedBy=@@IDENTITY, createdBy=@@IDENTITY 
					WHERE idUser=@@IDENTITY;`, function (e, r, f) {
                if (e)
                    throw e;
            });
        });
    }
    ;
});
module.exports.getMyApp = (response, id) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`SELECT
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
module.exports.getMyApps = (response) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`SELECT
    * 
    FROM
    app`, function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"apps\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.getBug = (response, id) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`SELECT
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
    database.pool.query(`SELECT
    * 
    FROM
    bugs
    WHERE
    title = \'${id}\' ORDER BY idBug DESC`, function (e, r, f) {
        if (e)
            throw e;
        database.pool.query(`SELECT
    	    COUNT(*) as counter
    	    FROM
    	    bugs
    	    WHERE
    	    title = \'${id}\' `, function (er, re, fu) {
            response.send(JSON.parse(('{\"bugs\":' + JSON.stringify(r) + ',\"counter\":' + JSON.stringify(re) + '}')));
        });
        // response.send(JSON.parse(('{\"bugs\":'+JSON.stringify(r)+'}')));       
    });
});
module.exports.getBugsSearch = (response, id, tag, offset) => __awaiter(void 0, void 0, void 0, function* () {
    if (tag) {
        database.pool.query(`SELECT
    	* 
    	FROM
    	bugs
    	WHERE
    	details LIKE \'\%${id}\%\' AND title = \'${tag}\' 
        ORDER BY idBug DESC LIMIT 5 OFFSET ${offset}`, function (e, r, f) {
            if (e)
                throw e;
            database.pool.query(`SELECT
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
        database.pool.query(`SELECT
		* 
		FROM
		bugs
		WHERE
		details LIKE \'\%${id}\%\' 
        ORDER BY idBug DESC LIMIT 5 OFFSET ${offset}`, function (e, r, f) {
            if (e)
                throw e;
            database.pool.query(`SELECT
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
module.exports.getBugsApp = (response, id) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`SELECT
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
module.exports.getBugsDeveloper = (response, id) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`SELECT
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
    database.pool.query(`SELECT
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
module.exports.getBugs = (response) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`SELECT
    * 
    FROM
    bugs ORDER BY idBug DESC
    LIMIT 5`, function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"bugs\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.getMyAppHasSpecialists = (response, id) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`SELECT
    * 
    FROM
    programmers_of_app
    WHERE
    App_idApp = ?`, [id], function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"programmers\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.getMyAppsHasSpecialist = (response, id) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`SELECT
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
module.exports.getBugType = (response, id) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`SELECT
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
module.exports.getPrivilege = (response, id) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`SELECT
    * 
    FROM
    privilege
    WHERE
    idApp = ?`, [id], function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"privileges\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.getPrivileges = (response) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`SELECT
    * 
    FROM
    privilege`, function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"privileges\":' + JSON.stringify(r) + '}')));
    });
});
//#endregion
module.exports.getMyAppsHasSpecialists = (response) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`SELECT
    * 
    FROM
    app_has_specialist`, function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"programmers\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.getAuth = (response, mail, pass) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`SELECT
    *
    FROM
    users
    WHERE
    mail = ?`, [mail], function (e, r, f) {
        if (e)
            throw e;
        if (r.length === 0) {
            response.status(401).send({ errors: ['No such a user'] });
        }
        else if (r[0].password === pass) {
            const token = jwt.sign(r[0], secret);
            response.send({
                errors: '',
                token: token,
                user: r[0]
            });
        }
        else {
            response.status(401).send({ errors: ['Invalid password'] });
        }
    });
});
module.exports.getUser = (response, id) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`SELECT
    * 
    FROM
    users
    WHERE
    idUser = ?`, [id], function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"users\":' + JSON.stringify(r[0]) + '}')));
    });
});
module.exports.getUsers = (response) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`SELECT
    * 
    FROM
    users`, function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"users\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.getSpecificUsers = (response, id) => __awaiter(void 0, void 0, void 0, function* () {
    let counter = ``;
    for (let i = 0; i < id.length; i++) {
        if (i != 0) {
            counter += `OR `;
        }
        counter += ` idUser = ${id[i]} `;
    }
    console.log(counter);
    database.pool.query(`SELECT
    * 
    FROM
    users
	WHERE ${counter}`, function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"users\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.getAdmin = (response) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`SELECT
    * 
    FROM
    admins`, function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"users\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.getProgrammers = (response) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`SELECT
    * 
    FROM
    programmers`, function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"users\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.getProgrammersToBug = (response, id) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`SELECT
    *
    FROM
    programmers_to_bugs
	WHERE
	idBug = ?`, [id], function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"programmers\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.getUserPrivilege = (response, id) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`SELECT
    * 
    FROM
    user_has_privilege
    WHERE
    idApp = ?`, [id], function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"roles\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.getUserPrivileges = (response) => __awaiter(void 0, void 0, void 0, function* () {
    database.pool.query(`SELECT
    * 
    FROM
    user_has_privilege`, function (e, r, f) {
        if (e)
            throw e;
        response.send(JSON.parse(('{\"roles\":' + JSON.stringify(r) + '}')));
    });
});
module.exports.verifyAuthToken = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(" ") : ['', ''];
    // verify the token
    jwt.verify(token[1], process.env.SECRET, function (err, decoded) {
        if (err) {
            return res.status(401).send({ errors: [err] });
        }
        // save to request object for later use
        req.userId = decoded.idUser;
        next();
    });
};
module.exports.connect = () => {
    database.connection.connect((err, res) => {
        if (err)
            throw err;
        //console.log("connected to db",res);
    });
};
