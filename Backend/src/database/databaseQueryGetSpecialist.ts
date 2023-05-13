import { pool } from './databaseConnection.js';

module.exports.getMyAppHasSpecialists = async (response:any,id:any) => {
    pool.query(`SELECT
    * 
    FROM
    programmers_of_app
    WHERE
    App_idApp = ${id}`, function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"programmers\":'+JSON.stringify(r)+'}')));       
    });
}