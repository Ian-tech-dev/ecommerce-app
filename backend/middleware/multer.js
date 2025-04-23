import multer from 'multer';

//storage configuration
const storage = multer.diskStorage({
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})

//upload middleware
const upload = multer({storage})//keep the filename storage for the middleware to work

export default upload; 