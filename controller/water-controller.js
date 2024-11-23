const { fields } = require("../middlewares/upload")
const prisma = require("../PrismaClient/prisma")
const createError = require("../utils/createError")
const tryCatch = require("../utils/tryCatch")

module.exports.createWaterData = tryCatch(async(req,res) => {
  const {date,fields} = req.body;
  console.log(req.body)
  

  const result = await prisma.$transaction(async (prisma) => {
    // ตรวจสอบว่ามี Date record ที่มีค่าเดียวกันอยู่แล้วหรือไม่
    let existingDate = await prisma.date.findFirst({
      orderBy:{
        createAt: 'desc'
      },

      where: {
        date: date,
      }
    });
    console.log(existingDate)
    
    if (existingDate) {
      // ถ้ามี Date record อยู่แล้ว ใช้อันเดิม
      createdDate = existingDate;
    } else {
      // ถ้าไม่มี สร้าง Date record ใหม่
      createdDate = await prisma.date.create({
        data: {
          date: date,
          userId: req.user.id
        }
      });
    }

    // สร้าง Field และ Watering records
    const createdFields = await Promise.all(fields.map(async (field) => {
      const createdField = await prisma.field.create({
        data: {
          fieldName: field.fieldName,
          dateId: createdDate.id,
          waterings: {
            create: {
              firstTime: field.firstTime,
              lastTime : field.lastTime,
              duration:field.duration,
              status: field.status,
              
            }
          }
        },
        include: {
          waterings: true
        }
      });
      return createdField;
    }));
    
    return { createdDate, createdFields };
  });
  
  res.json({
    message: 'Water data created successfully',
    data: result
  });

  
  
  
  
})




module.exports.getAllWaterData = tryCatch(async(req,res) => {
    const rs = await prisma.date.findMany({
      orderBy:{
        createAt:'desc'
      },
      include:{
        
        user:{
          select:{
            id: true, username: true,role:true

          }
        },
        field:{
          select:{
            id:true , fieldName:true , createAt:true,updateAt:true ,waterings:true
          },
          
        }
      
        
    
      }
    })
    res.json({dates:rs})
})


module.exports.DeleteWaterWateringData = tryCatch(async(req,res) => {
  const {id} = req.params
  const DeleteWatering = await prisma.watering.findUnique({
    where:{id:+id}
  })
  console.log(req.user.id)
  if (DeleteWatering.userId !== req.user.id) {
      createError(401, "cannot delete wateringData")
  }
  const rs = await prisma.watering.delete({
    where:{
      id:+id
    }
  })
  res.json({message:'wateringData Deleted'})
})






















module.exports.putWaterData = tryCatch(async(req,res) => {
  
  const {date ,fieldName , firstTime, lastTime ,duration, status } = req.body
  
    const rsDate = await prisma.date.create({
        data:{
            date:date,
            userId:req.user.id
        }
    })
    const rsField = await prisma.field.createMany({
        data:{
            fieldName:fieldName,
            dateId:rsDate.id

        }
    })
    const rsWater = await prisma.watering.create({
       data:{
        firstTime:firstTime,
        lastTime:lastTime,
        duration:duration,
        status:status,
        fieldId:rsField.id
       }
    })
    res.json('hi')

})


module.exports.DeleteWaterDateData = tryCatch(async(req,res) => {
    const {id} = req.params
    const DeleteDate = await prisma.date.findUnique({
      where:{id:+id}
    })
    console.log(req.user.id)
   
    if (DeleteDate.userId !== req.user.id) {
        createError(401, "cannot delete DateData")
    }
    const rs = await prisma.date.delete({
      where:{
        id:+id
      }
    })
    res.json({message:"Deleted DateData"})

})
module.exports.DeleteWaterFieldData = tryCatch(async(req,res) => {
  const {id} = req.params
  if (req.user.role !== 'ADMIN' ) {
      createError(401, "cannot delete FieldData")
  }
  
  const rs = await prisma.field.delete({
    where:{
      id:+id
    }
  })
  res.json({message:"Deleted FieldData"})

})
