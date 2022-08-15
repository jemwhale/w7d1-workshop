const {buildDB} = require('./db/populateDataBase')
buildDB()

const express = require('express');
const { Cheese } = require('./models');
const { Board} = require('./models');
const { boardData } = require('./db/seedData');
const app = express()
const port = 3000

app.get('/', async (req, res)=>{
    console.log(req);

    res.sendStatus(200);
})

app.get('/feta', async (req, res)=>{
    console.log(req);
    const queriedCheese = await Cheese.findOne({
        where: {
            title: 'Feta'
        }
    })
    let {title, description} = queriedCheese
    let payload = {
        title: title,
        description: description
    }
    res.send(payload);
})

app.get('/cheeses/starts-with-c', async (req, res)=>{
    console.log(req);
    const dbQuery = await Cheese.findAll()
    let startsWithC = dbQuery.filter((cheese)=>{
        if (cheese.title[0]==='C'){return true}
    })
    res.send(startsWithC);
})

app.get('/cheeses/worst-rated-board', async (req, res)=>{
    
    const dbQuery = await Board.findAll()
    let count = 100
    let worst = 0
    for (each of dbQuery){
        if(each.rating < count){
            count = each.rating
            worst = each
        }
    }
    let {type, rating} = worst
    let payload = {
        type: type,
        rating: rating
    }
    res.send(payload);
})

app.listen(port, ()=>{
    console.log(`The server is live and listening at http://localhost:${port}`)
});
