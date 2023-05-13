import { pool } from './databaseConnection.js';

module.exports.getBugs = async (response:any) => {
    pool.query(`SELECT
    * 
    FROM
    bugs ORDER BY idBug DESC
    LIMIT 5`, function(e:Error,r:Response,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"bugs\":'+JSON.stringify(r)+'}')));       
    });
}

module.exports.getBug = async (response:any,id:any) => {
    pool.query(`SELECT
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
    pool.query(`SELECT
    * 
    FROM
    bugs
    WHERE
    bugId = ${id} ORDER BY idBug DESC`, function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"bugs\":'+JSON.stringify(r)+'}')));       
    });
}

module.exports.getBugsDeveloper = async (response:any,id:any) => {
    pool.query(`SELECT
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
    pool.query(`SELECT
    * 
    FROM
    bugs
    WHERE
    createdBy = ${id} ORDER BY idBug DESC`, function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"bugs\":'+JSON.stringify(r)+'}')));       
    });
}

module.exports.getBugsApp = async (response:any,id:any) => {
    pool.query(`SELECT
    * 
    FROM
    bugs
    WHERE
    appId = ${id} ORDER BY idBug DESC`, function(e:Error,r:any,f:any){
        if(e) throw e;
        response.send(JSON.parse(('{\"bugs\":'+JSON.stringify(r)+'}')));       
    });
}

module.exports.getBugsSearch = async (response:any,id:any, tag:any, offset:any ) => {
	if (tag) {
		pool.query(`SELECT
    	* 
    	FROM
    	bugs
    	WHERE
    	details LIKE \'\%${id}\%\' AND title = \'${tag}\' 
        ORDER BY idBug DESC LIMIT 5 OFFSET ${offset}`, function(e:Error,r:any,f:any){
        	if(e) throw e;
            pool.query(`SELECT
    	    COUNT(*) as counter
    	    FROM
    	    bugs
    	    WHERE
    	    details LIKE \'\%${id}\%\' AND title = \'${tag}\' `, function(er:Error,re:any,fu:any){
        	    response.send(JSON.parse(('{\"bugs\":'+JSON.stringify(r)+',\"counter\":'+JSON.stringify(re)+'}')));
            });
        });
	}else{
		pool.query(`SELECT
		* 
		FROM
		bugs
		WHERE
		details LIKE \'\%${id}\%\' 
        ORDER BY idBug DESC LIMIT 5 OFFSET ${offset}`, function(e:Error,r:any,f:any){
			if(e) throw e;
			pool.query(`SELECT
    	    COUNT(*) as counter
    	    FROM
    	    bugs
    	    WHERE
    	    details LIKE \'\%${id}\%\'`, function(er:Error,re:any,fu:any){
        	    response.send(JSON.parse(('{\"bugs\":'+JSON.stringify(r)+',\"counter\":'+JSON.stringify(re)+'}')));
            });     
		});
	}
}