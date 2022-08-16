const {buildDB} = require('./db/populateDataBase')
buildDB()

const express = require('express');
const { Cheese } = require('./models');
const { Board} = require('./models');
const { boardData } = require('./db/seedData');
const app = express()
const port = 3000

app.get('/', async (req, res)=>{


    res.sendStatus(200);
})

app.get('/cheeses/:cheese', async (req, res)=>{
    let newString = req.params.cheese[0].toUpperCase() + req.params.cheese.slice(1).toLowerCase()
    const queriedCheese = await Cheese.findOne({
        where: {
            title: newString
        }
    })
    if (!queriedCheese){
        res.send("Sorry, we don't stock that cheese!")
        return
    }else{
        let {title, description} = queriedCheese
        let payload = {
            title: title,
            description: description
        }
        res.send(payload);
    }
})

app.get('/cheeses/starts-with/:letter', async (req, res)=>{
    let newString = req.params.letter[0].toUpperCase()
    const dbQuery = await Cheese.findAll()
    let startsWith = dbQuery.filter((cheese)=>{
        if (cheese.title[0]===newString){return true}
    })

    if(startsWith.length === 0){
        res.send("Sorry, no cheeses beginning with that letter!")
        return
    }else{
        res.send(startsWith.map(i => i.title));
    }
})


// currently only returns one cheese
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

app.get('/test/test', async (req, res)=>{
    let x = parseInt(req.query.a)
    let y = parseInt(req.query.b)
    console.log(x+y)
    res.sendStatus(200)
})

app.listen(port, ()=>{
    console.log(`The server is live and listening at http://localhost:${port}`)
});
