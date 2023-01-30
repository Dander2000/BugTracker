'use strict';
import { NextFunction } from "express";
import { Response } from "express";

const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session');

const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;

const { connect } = require('./database/databaseQuery.js');
const apps = require('./route/routeApps');
const users = require('./route/routeUsers');
const login = require('./route/routeLogin');
const privileges = require('./route/routePrivileges');
const bugTypes = require('./route/routeBugTypes');
const appHasBugs = require('./route/routeAppHasBugs');
const appHasSpecialists = require('./route/routeAppHasSpecialists');
const userHasPrivileges = require('./route/routeUserHasPrivileges');

const corsOptions = {
	origin: 'http://localhost:4101',
  	optionsSuccessStatus: 200
}
const sessionOptions = {
	secret: process.env.SECRET,
	resave: true,
	saveUninitialized: true,
	cookie: { secure: true }
}

app.get('/', (req:any, res:any) => {
    res.send('Good Backend of Bug Tracker');
    
});

app.use(session(sessionOptions));
app.use(cors(corsOptions));
app.use('/apps', apps);
app.use('/users', users);
app.use('/auth', login)
app.use('/privileges', privileges);
app.use('/bugtypes', bugTypes);
app.use('/bugs', appHasBugs);
app.use('/appHasSpecialists', appHasSpecialists);
app.use('/userHasPrivileges', userHasPrivileges);

app.use((err:Error, req:Request, res:Response, next:NextFunction) =>{
    console.error(err.stack);
    res.status(500).send('big no no there happend');
    next();
});

app.listen(port, ()=>{
    console.log(`[server]: Server is running at https://localhost:${port}`);
    connect();

});