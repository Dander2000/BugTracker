import { pool } from './databaseConnection.js';

module.exports.getMyApps = async (response:any) => {
    pool.query(`SELECT
    * 
    FROM
    app`, function(e:Error,r:Response,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"apps\":'+JSON.stringify(r)+'}')));        
    });
}

module.exports.getMyApp = async (response:any,id:any) => {
    pool.query(`SELECT
    * 
    FROM
    app
    WHERE
    idApp = ?`,[id], function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"apps\":'+JSON.stringify(r)+'}')));
    });
}

module.exports.getMyAppsHasSpecialist = async (response:any,id:any) => {
    pool.query(`SELECT
    * 
    FROM
    apps_of_programmer
    WHERE
    User_idUser = ?`,[id], function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"programmers\":'+JSON.stringify(r)+'}')));       
    });
}