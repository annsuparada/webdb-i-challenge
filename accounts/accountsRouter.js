const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    db('accounts')
    .from('accounts')
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({errorMessage: 'The accounts information could not be retrieved'})
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts')
        .where({ id })
        .first()
        .then(response => {
            if (response) {
                res.status(200).json(response)
            } else {
                res.status(404)
                .json({ message: 'The item with the specified ID does not exist.' })
            }
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'The account information could not be retrieved'})
        })
})

router.post('/', validateAccounts,(req, res) => {
    const accountsDb = req.body;
    db('accounts')
        .insert(accountsDb, 'id')
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'There was an error while saving the account to the database'})
        })
})

router.put('/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    db('accounts')
        .where({ id })
        .update(changes)
        .then(response => {
            if (response && response > 0) {
                res.status(200).json(response)
            } else {
                res.status(404)
                .json({ message: 'The item with the specified ID does not exist.' })
            }
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'There was an error while saving the account to the database'})
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts')
        .where({ id })
        .del()
        .then(response => {
            if (response && response > 0) {
                res.status(200).json({ message: 'The account was deleted'})
            } else {
                res.status(404)
                .json({ message: 'The item with the specified ID does not exist.' })
            }
            
        })
        .catch(err => {
            res.json({errorMessage: 'There was an error while saving the account to the database'})
        })
});


function validateAccounts(req, res, next) {
    if(!req.body) res.status(400).json({ message: "missing user data" })
    if(!req.body.name) res.status(400).json({ message: "missing required name field" })
    if(!req.body.budget) res.status(400).json({ message: "missing required budget field" })
    next()
};
module.exports = router;