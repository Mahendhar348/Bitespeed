const mongoose = require('mongoose');
class server {
   connectDB= async ()=>{
        return await mongoose.connect('mongodb+srv://mahitagirancha:21INzoCcDpi932EL@bitespeed.56jwonq.mongodb.net/?retryWrites=true',{
            useNewUrlParser:true,
            // useUndefinedTopology:true
        });
   } 
}

export const server_db= new server();
