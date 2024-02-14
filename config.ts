const dotenv = require('dotenv');
dotenv.config();
module.exports={
    NODE_ENV : process.env.NODE_ENV || 'development',
    MONGO_URI : process.env.MONGO_URI || "",
    PORT : process.env.PORT || 3010
}
