const cloudinary = require("cloudinary").v2;
          
cloudinary.config({ 
  cloud_name: 'dlxpb8ef7', 
  api_key: '767526735897713', 
  api_secret: 'g0OqeWznHH8I--Ru4U0PJ58SfF4' 
});

module.exports = cloudinary;