const express = require('express')
require('./db/mongoose')
const adminRouter = require("./routers/admin")
const usersRouter = require("./routers/users")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(adminRouter)

app.listen(port, ()=>{
    console.log('Server is running port' + port)
})
