const express = require('express')
const boardsRouter = express.Router()
const {check, validationResult} = require('express-validator')
const { Board } = require('../models');

boardsRouter.get('/', (req, res) => {
    res.sendStatus(200)
})

boardsRouter.post('/', [check('type').not().trim().isEmpty()], async (req, res) => {
    const errors = validationResult
    if (!errors.isEmpty()){
        res.status(400).json({error: errors.array()})
        return 
    }
    await Board.create(req.body)
    res.sendStatus(200)
})

boardsRouter.put('/', async (req, res) =>{
    let foundBoard = await Board.findByPk(req.body.id)
    await foundBoard.update({
        rating: req.body.rating
    })
    res.sendStatus(200)
})

boardsRouter.delete('/', async (req, res) =>{
    let foundBoard = await Board.findByPk(req.body.id)
    await foundBoard.destroy()
    res.sendStatus(200)
})

// currently only returns one cheese
boardsRouter.get('/worst-rated-board', async (req, res)=>{
    
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

module.exports = {boardsRouter}



