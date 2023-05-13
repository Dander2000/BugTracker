import { pool } from './databaseConnection.js';

module.exports.insertUser = async (response:any,firstName:any, surname:any, nick:any, mail:any, pass:any) => {
    if (!nick) {
		pool.query(`INSERT INTO user
			(idUser, firstName, surname, mail, password, nick, createdBy,createdAt, lastUpdatedAt, lastUpdatedBy)
			VALUES
			(default, '${firstName}', '${surname}', '${mail}', '${pass}', null, 1 ,now(), now(), 1)`, function(e:Error,r:any,f:any){
				if(e) throw e;
				pool.query(`UPDATE user
					SET lastUpdatedBy=@@IDENTITY, createdBy=@@IDENTITY 
					WHERE idUser=@@IDENTITY;`, function(e:Error,r:any,f:any){
					if(e) throw e;
					}
				);
			}
		);
	}else{
		pool.query(`INSERT INTO user
			(idUser, firstName, surname, mail, password, nick, createdBy,createdAt, lastUpdatedAt, lastUpdatedBy)
			VALUES
			(default, '${firstName}', '${surname}', '${mail}', '${pass}', '${nick}', 1 ,now(), now(), 1)`, function(e:Error,r:any,f:any){
				if(e) throw e;
				pool.query(`UPDATE user
					SET lastUpdatedBy=@@IDENTITY, createdBy=@@IDENTITY 
					WHERE idUser=@@IDENTITY;`, function(e:Error,r:any,f:any){
						if(e) throw e;
					}
				);
			}
		)
	};
}
// TODO SELECT BEFORE UPDATE TO GET ID OF NEW USER INSTED OF @@IDENITTY