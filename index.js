const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;
const expressSwagger = require('express-swagger-generator')(app);
const {options} = require('./apiDocs');

const userRouter = require('./routes/user');
const petRouter = require('./routes/pet');

// MIDDLEWARE NEEDED
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// user routes
app.use('/users', userRouter);
app.use('/pets', petRouter);

// POST - CREATE PET
// GET - READ PET
// PUT - UPDATE PET
// DELETE - DELETE PET

expressSwagger(options)
app.listen(port, () => {
  console.log('Petpedia is running on Port: '+port);
});
