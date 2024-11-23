const tryCatch = require("../utils/tryCatch")
const prisma = require('../PrismaClient/prisma')
const createError = require('../utils/createError')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')






module.exports.register = tryCatch(async (req, res) => {
    const { email, password, username, confirmPassword } = req.body

    const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const validateUserName = /^[a-zA-Z][a-zA-Z0-9._]{2,19}$/
    const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*_]{6,}$/


    if(!validateEmail.test(email)){
        createError(400,"Invalid email format")
    }
    if(!validateUserName.test(username)){
        createError(400,"Username must be 3-20 characters long and contain only letters, numbers, and underscores")
    }
    if(!validatePassword.test(password)){
        createError(400,"Password must be at least 6 characters long, with 1 uppercase, 1 lowercase, 1 number")
    }


    if (!email.trim() && password.trim() && username.trim()) {
        createError(400, "Data is empty")
    }
    if (password !== confirmPassword) {
        createError(400, "password and confirmPassword is not match")
    }
    const findEmail = await prisma.user.findUnique({
        where: { email: email }
    })
    const findUsername = await prisma.user.findUnique({
        where: { username: username }
    })
    if (findEmail) {
        createError(400, `${email} is already register`)
    }
    if (findUsername) {
        createError(400, `${username} is already register`)
    }
    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = {
        email: email,
        username: username,
        password: hashPassword

    }
    const rs = await prisma.user.create({ data: newUser })
    res.json({ message: `email:${email} username: ${username} password:${password} registered!!` })

})


module.exports.login = tryCatch(async (req, res) => {
    const { username, password } = req.body

    if (!(username.trim() && password.trim())) {
        createError(400, "username or password is empty")
    }

    const findUser = await prisma.user.findUnique({
        where: { username: username }
    })
    if (!findUser) {
        createError(400, `Please check username or password`)
    }

    let passwordCheck = await bcrypt.compare(password, findUser.password)
    if (!passwordCheck) {
        createError(401, "invalid login")
    }
    const payload = {
        id: findUser.id
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '30d' })
    const { ...userData } = findUser
    res.json({ token, user: userData })
    console.log(userData)





})
module.exports.getData = tryCatch(async (req, res,next) => {
    // console.log(req)
    try {
        const email = req.user.email
        const member = await prisma.user.findFirst({
            where: {
                email:email
            },
            select: {
                id: true,
                username: true,
                email: true,
                role: true
            }
        })
        // console.log(member)
        res.json({ member })
    } catch (err) {
        console.log(err)
        next()
    }


})

