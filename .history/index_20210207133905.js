const express = require('express')
require('./src/db/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.get('/admin', (req, res)=> {
    res.send('Admin login')
})


app.listen(port, ()=>{
    console.log('Server is running port' + port)
})
