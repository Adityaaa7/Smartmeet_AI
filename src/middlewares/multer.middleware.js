

import multer from "multer"

const storage = multer.diskStorage({       //we'll upload the file from user on local disk storage  
    destination: function (req, file, cb) {
      cb(null, "./public/temp")                  //(null is for error handling, path is for destination)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
 export const upload = multer({ 
    storage,
})