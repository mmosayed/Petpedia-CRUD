const express = require('express');
const petRouter = express.Router();

const petService = require('../services/pet');

/**
 * @typedef Pet
 * @property {integer} id
 * @property {string} name.required - Pet Name 
 * @property {string} type.required - Pet Type
 * @property {integer} owner.required - Pet Owner Id
 * @property {integer} age.required - Pet Age
 */


/**
 * This function comment is parsed by doctrine
 * @route POST /pets
 * @group Pet - Operations about pets
 * @param {number} id.param.required - pet id - eg: user@domain
 * @returns {object} 200 - id of created resource 
 * @returns {Error}  default - Unexpected error
 */
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

/**
 * This function comment is parsed by doctrine
 * @route GET /pets/:id
 * @group Pet - Operations about pets
 * @param {number} pet id - eg: 5
 * @returns {Pet.model} 200 - id of created resource 
 * @returns {Error}  default - Unexpected error
 */
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
