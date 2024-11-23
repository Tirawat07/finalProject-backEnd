const createError = require('../utils/createError')
const tryCatch = require('../utils/tryCatch')
const jwt = require('jsonwebtoken')
const prisma = require('../PrismaClient/prisma')

module.exports = tryCatch(async(req,res,next)=>{


    const authorization = req.headers.authorization
    if(!authorization || !authorization.startsWith('Bearer')){
        createError(401,"Unauthorized")
    }

    const token = authorization.split(' ')[1]
    if(!token){
        createError(401,"to token")
    }

    const payload = jwt.verify(token,process.env.JWT_SECRET_KEY)

    const foundUser = await prisma.user.findUnique({
        where : {id : payload.id}
    })
    if(!foundUser){
        createError(401,"user not found")

    }
    const {...userData} = foundUser 
    req.user = userData
    //ส่งuserData ไปยังฟังก์ชั่นต่อไป
    next()
    

})  