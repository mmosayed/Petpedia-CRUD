const express = require('express');
const userRouter = express.Router();
const UserService = require('../services/user');

// POST - CREATE USER
userRouter.post('/');

// GET - READ USER
userRouter.get('/:id', (req, res) => {
  const {id} = req.params;

  UserService.read(id)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err.toString());
    })
});

// PUT - UPDATE USER
userRouter.put('/:id');

// DELETE - DELETE USER
userRouter.delete('/:id');


module.exports = userRouter;