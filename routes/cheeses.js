const express = require('express')
const cheesesRouter = express.Router()
const { Cheese } = require('../models');

cheesesRouter.get('/', (req, res) => {
    res.sendStatus(200)
})

cheesesRouter.get('/:cheese', async (req, res)=>{
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

cheesesRouter.get('/starts-with/:letter', async (req, res)=>{
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

module.exports = {cheesesRouter}