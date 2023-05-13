import { pool } from './databaseConnection.js';

module.exports.insertBugs = async (response:any, details:any, appId:any, bugId:any, userId:any ) => {
    pool.query(`INSERT INTO app_has_bug
    (idBug, appId, bugId, ProgressingBy, details, finished, createdBy, createdAt, lastUpdate)
	VALUES
    (default, ${appId}, ${bugId}, null, \'${details}\', default, ${userId}, now(), now())`, function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"Succes\":'+JSON.stringify(r)+'}')));
    });
}