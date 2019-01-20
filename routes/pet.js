const express = require('express');
const petRouter = express.Router();

const petService = require('../services/pet');

petRouter.post('/', (req, res) => {
    const {age, name, owner, type} = req.body;
    petService.create(age, name, owner, type)
        .then(data => {
            res.json({
                data,
            });
        })
        .catch(e => {
            res.status(400);
            res.json({
                error: e.toString(),
            })
        })
});

petRouter.get('/:id', (req, res) => {
    const {id} = req.params;
    petService.read(id).then(data => {
        res.json({
            data,
        });
    })
});


petRouter.put('/:id', (req, res) => {
    const {id} = req.params;
    const {age, name, owner} = req.body;

    if (!age || !name || !owner) {
        res.status(400)
        res.json({e: "Invalid body params"})
    }

    petService.update(id, age, name, owner)
        .then((data) => {
            if (!data.rowCount) return Promise.reject(`Resource ${id} not found.`);

            res.status(204)
            res.json({})
        })
        .catch(e => {
            console.log(e)

            res.status(400)
            res.json({e: e.toString()})
        })
});

petRouter.delete('/:id', (req, res) => {
    const {id} = req.params;

    petService.delete(id).then(data => {
        res.json({ success: `Pet with ID: ${id} deleted.`});
    })
});

module.exports = petRouter;
