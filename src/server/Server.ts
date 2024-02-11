const mongoose = require('mongoose');
class server {
   connectDB= async ()=>{
        return await mongoose.connect('mongodb://localhost:27017/Database',{
            useNewUrlParser:true,
            // useUndefinedTopology:true
        });
   } 
}

export const server_db= new server();