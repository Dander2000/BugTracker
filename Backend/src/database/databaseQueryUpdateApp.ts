import { pool } from './databaseConnection.js';

module.exports.changeStateApp = async (response:any, appId:any, newAppState:any ) => {
    pool.query(`UPDATE app SET
	appState=${newAppState} WHERE idApp=${appId}`, function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"Succes\":'+JSON.stringify(r)+'}')));
    });
}
