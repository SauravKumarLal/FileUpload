//cloudinary k config method ko use kar k hum kar sakte hai cloudinary k saath connect

const cloudinary = require('cloudinary').v2;
require("dotenv").config();

exports.cloudinaryConnect = () => {
    try{
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        }) //cloud name, api key, api secret
    }
    catch(error){
        console.log(error);
    }
}

