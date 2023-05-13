import { pool } from './databaseConnection.js';

module.exports.getPrivileges = async (response:any) => {
    pool.query(`SELECT
    * 
    FROM
    privilege`, function(e:Error,r:Response,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"privileges\":'+JSON.stringify(r)+'}')));        
    });
}

module.exports.getPrivilege = async (response:any,id:any) => {
    pool.query(`SELECT
    * 
    FROM
    privilege
    WHERE
    idApp = ?`,[id], function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"privileges\":'+JSON.stringify(r)+'}')));       
    });
}