module.exports = (func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next)
        } catch (err) {
            console.log(err)
            // ตรวจสอบว่ายังไม่ได้ส่ง response ไปก่อนหน้านี้
            if (!res.headersSent) {
                res.status(err.statusCode || 500).json({ 
                    message: err.message || 'Something went wrong'
                })
            }
        }
    }
    

}