import { pool } from './databaseConnection.js';

module.exports.getBugTypes = async (response:any) => {
    database.pool.query(`SELECT
    * 
    FROM
    bugtype`, function(e:Error,r:Response,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"bugtypes\":'+JSON.stringify(r)+'}')));    
    });
}

module.exports.getBugType = async (response:any,id:any) => {
    pool.query(`SELECT
    * 
    FROM
    bugtype
    WHERE
    idBug = ?`,[id], function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"bugtypes\":'+JSON.stringify(r)+'}')));         
    });
}