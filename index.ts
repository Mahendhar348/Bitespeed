//  const server_db=require('./server/server');

import { postContacts } from "./src/routes/Identify";
import { server_db } from "./src/server/Server";
const cors = require('cors');
import * as bodyParser from 'body-parser';

const corsOptions = {
    origin: 'http://localhost:3000/',
    credentials: true,
    optionSuccessStatus: 200
}




// import {server_db} from './server/server'
// const server_db= require('./server/server')
const app = require('express')();
const port = 3010;
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

class connection{

    connectServer(){
        return server_db.connectDB().then((db:any) => {
            app.use('/identify',postContacts());
        }).catch((err:any) => {
            console.error('check connection',err)
        });
    }
    
}

app.listen(port,()=>{
  new connection().connectServer();
})




 
// export const connect_db= new connection();
