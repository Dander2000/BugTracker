import { pool } from './databaseConnection.js';

module.exports.insertApp = async (response:any, name:any, description:any ) => {
    pool.query(`INSERT INTO app
	(idApp,name,description,appState)
	VALUES 
	(default,\'${name}\',\'${description}\',1)`, function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"Succes\":'+JSON.stringify(r)+'}')));
    });
}