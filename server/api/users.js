const express = require('express')
const router = express.Router()
const {Users} = require('../db/models')

router.get('/', async (req, res, next) => {
   try {
       const user = await Users.findAll()
       res.json(user)
   } catch (error){
       next(error)
   }
});

router.get('/:id', async (req, res, next) => {
    try {
        const user = await Users.findByPk(req.params.id)
        if (user) res.json(user);
        else res.sendStatus(404)
    } catch (error) {
        next(error)
    }
});
router.get('/login', async(req, res, next) => {
    try {
        res.status(201).json(await Users.create(req.body))
    } catch (error) {
        next(error)
    }
    });
    

router.post('/signup', async(req, res, next) => {
try {
    res.status(201).json(await Users.create(req.body))
} catch (error) {
    next(error)
}
});



