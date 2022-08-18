const {buildDB} = require('./db/populateDataBase')
const express = require('express');
const {boardsRouter, cheesesRouter} = require('./routes')
const port = 3000
const app = express()
buildDB()

app.use(express.json())
app.use('/boards', boardsRouter)
app.use('/cheeses', cheesesRouter)

app.listen(port, ()=>{
    console.log(`The server is live and listening at http://localhost:${port}`)
});
