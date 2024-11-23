const prisma = require("../PrismaClient/prisma");
const tryCatch = require("../utils/tryCatch");
const fs = require('fs/promises')
const cloudinary = require('../config/cloudinary')
const path = require('path');
const createError = require("../utils/createError");


module.exports.getAllEvent = tryCatch(async (req, res) => {

    
    
    
    const rs = await prisma.event.findMany({
        orderBy: {
            createAt: 'asc' 
        },
        include: {
            user: {
                select: {
                    id: true, username: true, email: true, role: true
                }
            },
            
            
        }




    })

    res.json({ events: rs })
})



module.exports.createEvent = tryCatch(async(req,res)=>{
    const {header,detail} = req.body
    const haveFile = !!req.file
    let uploadResult = {}
    if (haveFile) {
        uploadResult = await cloudinary.uploader.upload(req.file.path, {
            overwrite: true, // ถ้ามีรูปอยู่แล้ว จะทำการอัพเดท
            public_id: path.parse(req.file.path).name
        })
        fs.unlink(req.file.path)
    }

    const data = {
        header:header,
        detail:detail,
        image: uploadResult.secure_url || '',
        userId: req.user.id
    }

    const rs = await prisma.event.create({data:data})
    console.log(uploadResult)
    res.json(rs)

})

module.exports.editEvent = tryCatch(async(req,res)=>{
    console.log('hi')
   
    const {id} = req.params //ไอดีของการอัพเดท
    const {header,detail} = req.body

    
    const eventData = await prisma.event.findUnique({
        where:{
            id:+id}
        })
    if(!eventData || req.user.id !== eventData.userId){
        createError(401,"Cant update")
    }
    const haveFile = !!req.file
    let uploadResult = {}
    if(haveFile){
        uploadResult = await cloudinary.uploader.upload(req.file.path,{
            public_id : path.parse(req.file.path).name  //path.parse(req.file.path).name จะดึงเฉพาะชื่อไฟล์ออกมา
        })
        fs.unlink(req.file.path) //ลบไฟล์ที่อัพโหลดไปแล้ว
        if(eventData.image){
            cloudinary.uploader.destroy(getPublicId(eventData.image)) //ลบรูปที่อัพโหลดไปแล้ว
 
        }

    }
    let data = haveFile
    ?{header,detail,image: uploadResult.secure_url,userId: req.user.id }
    : { header,detail, userId: req.user.id }
    if(eventData.image && !haveFile){
        data = {header,detail,image:null}
    }
    const rs = await prisma.event.update({
        where:{id:+id},
        data:data
    })
    res.json(rs)
})

module.exports.deleteEvent = tryCatch(async (req, res) => {
    const { id } = req.params
    // console.log('hi')
    // console.log(id)
    const eventData = await prisma.event.findUnique({ where: { id: +id } })
    
    console.log(req.user.id)
    if (eventData.userId !== req.user.id) {
        createError(401, "cannot delete")
    }

    const rs = await prisma.event.delete({
        where: { id: +id }
    })
    res.json(rs)
})


module.exports.SearchEvent = tryCatch(async (req, res) => {
    console.log('hi')
    console.log(req.params)
    const {searchText} = req.params
    console.log(searchText)
    const rs = await prisma.event.findMany({
        orderBy: {
            createAt: 'asc'
        },
        where:{
            OR: [
                { header: { contains: searchText.toLowerCase() } }||{ detail: { contains: searchText.toLowerCase() } }
            ]
        }




    })
    console.log(rs)


    res.json({ results: rs })
    
})
