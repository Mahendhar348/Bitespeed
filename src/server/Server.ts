const mongoose = require('mongoose');
const config = require('../../config')
class server {
   connectDB= async ()=>{
        return await mongoose.connect(config.MONGO_URI,{
            useNewUrlParser:true,
        }).then((res:any)=>{
            console.log('Connect to DB');
        }).catch((err:any)=>{
            console.log(err);
        });
   } 
}

export const server_db= new server();