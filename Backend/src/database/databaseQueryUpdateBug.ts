import { pool } from './databaseConnection.js';

module.exports.assignBug = async (response:any, bugId:any, userId:any ) => {
    pool.query(`UPDATE app_has_bug SET
    ProgressingBy = ${userId}
	WHERE idBug = ${bugId}`, function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"Succes\":'+JSON.stringify(r)+'}')));
    });
}

module.exports.finishBug = async (response:any, bugId:any ) => {
    pool.query(`UPDATE app_has_bug 
	SET finished = 1 
	WHERE idBug = ${bugId}`, function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"Succes\":'+JSON.stringify(r)+'}')));
    });
}