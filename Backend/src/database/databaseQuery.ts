'use strict';
const database = require('./databaseConnection.js');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

module.exports.insertBugs = async (response:any,details:any, appId:any, bugId:any, userId:any ) => {
    database.pool.query(`INSERT INTO app_has_bug
    (idBug, appId, bugId, ProgressingBy, details, finished, createdBy, createdAt, lastUpdate)
	VALUES
    (default, ${appId}, ${bugId}, null, \'${details}\', default, ${userId}, now(), now())`, function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"Succes\":'+JSON.stringify(r)+'}')));
    });
}

module.exports.insertApp = async (response:any,name:any, description:any,  ) => {
    database.pool.query(`INSERT INTO app
	(idApp,name,description,appState)
	VALUES 
	(default,\'${name}\',\'${description}\',1)`, function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"Succes\":'+JSON.stringify(r)+'}')));
    });
}

module.exports.assignBug = async (response:any, bugId:any, userId:any ) => {
    database.pool.query(`UPDATE app_has_bug SET
    ProgressingBy = ${userId}
	WHERE idBug = ${bugId}`, function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"Succes\":'+JSON.stringify(r)+'}')));
    });
}

module.exports.assignApp = async (response:any, appId:any, userId:any ) => {
    database.pool.query(`INSERT INTO app_has_specialist 
	( App_idApp, User_idUser )
	VALUES(
    ${appId}, ${userId})`, function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"Succes\":'+JSON.stringify(r)+'}')));
    });
}

module.exports.changeStateApp = async (response:any, appId:any, newAppState:any ) => {
    database.pool.query(`UPDATE app SET
	appState=${newAppState} WHERE idApp=${appId}`, function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"Succes\":'+JSON.stringify(r)+'}')));
    });
}

module.exports.finishBug = async (response:any, bugId:any ) => {
    database.pool.query(`UPDATE app_has_bug 
	SET finished = 1 
	WHERE idBug = ${bugId}`, function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"Succes\":'+JSON.stringify(r)+'}')));
    });
}

module.exports.insertUser = async (response:any,firstName:any, surname:any, nick:any, mail:any, pass:any) => {
    if (!nick) {
		database.pool.query(`INSERT INTO user
			(idUser, firstName, surname, mail, password, nick, createdBy,createdAt, lastUpdatedAt, lastUpdatedBy)
			VALUES
			(default, '${firstName}', '${surname}', '${mail}', '${pass}', null, 1 ,now(), now(), 1)`, function(e:Error,r:any,f:any){
				if(e) throw e;
				database.pool.query(`UPDATE user
					SET lastUpdatedBy=@@IDENTITY, createdBy=@@IDENTITY 
					WHERE idUser=@@IDENTITY;`, function(e:Error,r:any,f:any){
					if(e) throw e;
					}
				);
			}
		);
	}else{
		database.pool.query(`INSERT INTO user
			(idUser, firstName, surname, mail, password, nick, createdBy,createdAt, lastUpdatedAt, lastUpdatedBy)
			VALUES
			(default, '${firstName}', '${surname}', '${mail}', '${pass}', '${nick}', 1 ,now(), now(), 1)`, function(e:Error,r:any,f:any){
				if(e) throw e;
				database.pool.query(`UPDATE user
					SET lastUpdatedBy=@@IDENTITY, createdBy=@@IDENTITY 
					WHERE idUser=@@IDENTITY;`, function(e:Error,r:any,f:any){
						if(e) throw e;
					}
				);
			}
		)
	};
}	


module.exports.getMyApp = async (response:any,id:any) => {
    database.pool.query(`SELECT
    * 
    FROM
    app
    WHERE
    idApp = ?`,[id], function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"apps\":'+JSON.stringify(r)+'}')));
    });
}

module.exports.getMyApps = async (response:any) => {
    database.pool.query(`SELECT
    * 
    FROM
    app`, function(e:Error,r:Response,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"apps\":'+JSON.stringify(r)+'}')));        
    });
}

module.exports.getBug = async (response:any,id:any) => {
    database.pool.query(`SELECT
    * 
    FROM
    bugs
    WHERE
    idBug = ${id} ORDER BY idBug DESC`, function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"bugs\":'+JSON.stringify(r)+'}')));       
    });
}

module.exports.getBugsBugType = async (response:any,id:any) => {
    database.pool.query(`SELECT
    * 
    FROM
    bugs
    WHERE
    bugId = ${id} ORDER BY idBug DESC`, function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"bugs\":'+JSON.stringify(r)+'}')));       
    });
}

module.exports.getBugsSearch = async (response:any,id:any, tag:any) => {
	if (tag) {
		database.pool.query(`SELECT
    	* 
    	FROM
    	bugs
    	WHERE
    	details LIKE \'\%${id}\%\' AND title = \'${tag}\' ORDER BY idBug DESC`, function(e:Error,r:any,f:any){
        	if(e) throw e;
        	response.send(JSON.parse(('{\"bugs\":'+JSON.stringify(r)+'}')));       
    	});
	}else{
		database.pool.query(`SELECT
		* 
		FROM
		bugs
		WHERE
		details LIKE \'\%${id}\%\' ORDER BY idBug DESC`, function(e:Error,r:any,f:any){
			if(e) throw e;
			response.send(JSON.parse(('{\"bugs\":'+JSON.stringify(r)+'}')));       
		});
	}
}

module.exports.getBugsApp = async (response:any,id:any) => {
    database.pool.query(`SELECT
    * 
    FROM
    bugs
    WHERE
    appId = ${id} ORDER BY idBug DESC`, function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"bugs\":'+JSON.stringify(r)+'}')));       
    });
}

module.exports.getBugsDeveloper = async (response:any,id:any) => {
    database.pool.query(`SELECT
    * 
    FROM
    bugs
    WHERE
    progressingBy = ${id} ORDER BY idBug DESC`, function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"bugs\":'+JSON.stringify(r)+'}')));       
    });
}

module.exports.getBugsReporter = async (response:any,id:any) => {
    database.pool.query(`SELECT
    * 
    FROM
    bugs
    WHERE
    createdBy = ${id} ORDER BY idBug DESC`, function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"bugs\":'+JSON.stringify(r)+'}')));       
    });
}

module.exports.getBugs = async (response:any) => {
    database.pool.query(`SELECT
    * 
    FROM
    bugs ORDER BY idBug DESC`, function(e:Error,r:Response,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"bugs\":'+JSON.stringify(r)+'}')));       
    });
}

module.exports.getMyAppHasSpecialists = async (response:any,id:any) => {
    database.pool.query(`SELECT
    * 
    FROM
    programmers_of_app
    WHERE
    App_idApp = ?`,[id], function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"programmers\":'+JSON.stringify(r)+'}')));       
    });
}

module.exports.getMyAppsHasSpecialist = async (response:any,id:any) => {
    database.pool.query(`SELECT
    * 
    FROM
    apps_of_programmer
    WHERE
    User_idUser = ?`,[id], function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"programmers\":'+JSON.stringify(r)+'}')));       
    });
}

module.exports.getMyAppsHasSpecialists = async (response:any) => {
    database.pool.query(`SELECT
    * 
    FROM
    app_has_specialist`, function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"programmers\":'+JSON.stringify(r)+'}')));       
    });
}

module.exports.getBugType = async (response:any,id:any) => {
    database.pool.query(`SELECT
    * 
    FROM
    bugtype
    WHERE
    idBug = ?`,[id], function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"bugtypes\":'+JSON.stringify(r)+'}')));         
    });
}

module.exports.getBugTypes = async (response:any) => {
    database.pool.query(`SELECT
    * 
    FROM
    bugtype`, function(e:Error,r:Response,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"bugtypes\":'+JSON.stringify(r)+'}')));    
    });
}
module.exports.getPrivilege = async (response:any,id:any) => {
    database.pool.query(`SELECT
    * 
    FROM
    privilege
    WHERE
    idApp = ?`,[id], function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"privileges\":'+JSON.stringify(r)+'}')));       
    });
}

module.exports.getPrivileges = async (response:any) => {
    database.pool.query(`SELECT
    * 
    FROM
    privilege`, function(e:Error,r:Response,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"privileges\":'+JSON.stringify(r)+'}')));        
    });
}

module.exports.getAuth = async (response:any,mail:any, pass:any) => {
    database.pool.query(`SELECT
    *
    FROM
    users
    WHERE
    mail = ?`,[mail], function(e:Error,r:any,f:any){
        if(e) throw e;
		if (r.length === 0){
			response.status(401).send({errors:['No such a user']});
		} else if (r[0].password === pass) {			
			const token = jwt.sign(r[0],secret);
			response.send({
				errors:'',
				token: token,
				user: r[0]
			});
		} else {
			response.status(401).send({errors:['Invalid password']});
		}      
    });
}

module.exports.getUser = async (response:any,id:any) => {
    database.pool.query(`SELECT
    * 
    FROM
    users
    WHERE
    idUser = ?`,[id], function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"users\":'+JSON.stringify(r[0])+'}')));         
    });
}

module.exports.getUsers = async (response:any) => {
    database.pool.query(`SELECT
    * 
    FROM
    users`, function(e:Error,r:Response,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"users\":'+JSON.stringify(r)+'}')));        
    });
}

module.exports.getSpecificUsers = async (response:any,id:any) => {
	let counter = ``;
	for (let i = 0; i < id.length; i++) {
		if (i!=0) {
			counter += `OR `;
		}
		counter += ` idUser = ${id[i]} `;
	}
	console.log(counter);
	
    database.pool.query(`SELECT
    * 
    FROM
    users
	WHERE ${counter}`, function(e:Error,r:Response,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"users\":'+JSON.stringify(r)+'}')));        
    });
}

module.exports.getAdmin = async (response:any) => {
    database.pool.query(`SELECT
    * 
    FROM
    admins`, function(e:Error,r:Response,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"users\":'+JSON.stringify(r)+'}')));        
    });
}

module.exports.getProgrammers = async (response:any) => {
    database.pool.query(`SELECT
    * 
    FROM
    programmers`, function(e:Error,r:Response,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"users\":'+JSON.stringify(r)+'}')));        
    });
}

module.exports.getProgrammersToBug = async (response:any, id:any) => {
    database.pool.query(`SELECT
    *
    FROM
    programmers_to_bugs
	WHERE
	idBug = ?`,[id], function(e:Error,r:Response,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"programmers\":'+JSON.stringify(r)+'}')));        
    });
}

module.exports.getUserPrivilege = async (response:any,id:any) => {
    database.pool.query(`SELECT
    * 
    FROM
    user_has_privilege
    WHERE
    idApp = ?`,[id], function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"roles\":'+JSON.stringify(r)+'}')));        
    });
}

module.exports.getUserPrivileges = async (response:any) => {
    database.pool.query(`SELECT
    * 
    FROM
    user_has_privilege`, function(e:Error,r:Response,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"roles\":'+JSON.stringify(r)+'}')));      
    });
}


module.exports.verifyAuthToken = (req:any, res:any, next:any):any =>{
	
	const token:Array<string> = req.headers.authorization ? req.headers.authorization.split(" ") : ['',''];
	
	// verify the token
	jwt.verify(token[1], process.env.SECRET, function (err:Error, decoded:any) {      
    	if (err) {
    	  	return res.status(401).send({ errors: [err]});
    	}
    	// save to request object for later use
    	req.userId = decoded.idUser;
    	next();
  	});
}

module.exports.connect = (): void =>{
	database.connection.connect((err:Error,res:any)=>{
		if (err) throw err;
		//console.log("connected to db",res);
		
	});
}

