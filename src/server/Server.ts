const mongoose = require('mongoose');
class server {
   connectDB= async ()=>{
        return await mongoose.connect('mongodb+srv://mahitagirancha:ZMGvmtuENS2QOtum@bitespeed.56jwonq.mongodb.net/?retryWrites=true',{
            useNewUrlParser:true,
        }).then((res:any)=>{
            console.log('Connect to DB');
        }).catch((err:any)=>{
            console.log(err);
        });
   } 
}

export const server_db= new server();