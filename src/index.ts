import { routes } from "./routes";
import { server_db } from "./server/Server";
import * as bodyParser from 'body-parser';
import express from 'express';
const cors = require('cors');
const dotenv= require('dotenv').config()

const port = process.env.PORT || 3010;

console.log(port)


class Connection{
    public app:express.Application;

    constructor(){
        this.app=express();
        this.configureApp();
    }

    configureApp(){
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:true}));
        this.app.listen(port,()=>{
            this.connectServer();
        })
    }

    connectServer(){
        return server_db.connectDB().then((res:any) => {
            this.app.use('/',routes.configureRoutes());
        }).catch((err:any) => {
            console.error('check connection',err);
        });
    };
}

export const  connection = new Connection();


