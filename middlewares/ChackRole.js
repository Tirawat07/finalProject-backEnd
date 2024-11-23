const createError = require("../utils/createError");
const tryCatch = require("../utils/tryCatch");

module.exports = tryCatch((req,res,next)=>{

    //รับค่าuserData มา
    const role = req.user.role
    console.log(role)


    if(!role ){
        createError(400,'Cannot verify')
    }
    if(role !== 'ADMIN'){
        
    createError(400, "not Allowed to enter  ")
    }
    
    next()

} )