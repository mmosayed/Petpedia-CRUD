const {db} = require('./dbConnect')
const PetService = {};

PetService.create = (age, name, owner, type) => {
  return db.one('INSERT INTO pets (age, name, owner, type) VALUES (${age}, ${name}, ${owner}, ${type}) RETURNING id;', {
    age,
    name,
    owner,
    type, 
  })
}

PetService.read = (id) => {
  return db.one('SELECT * FROM pets WHERE id=${id}', {id});
}

PetService.update = (id, age, name, owner) => {
  return db.result('UPDATE pets SET age=${age}, name=${name}, owner=${owner} WHERE id=${id}', {id, age, name, owner});
}

PetService.delete = (id) => {
  return db.none('DELETE FROM pets WHERE id=${id}', {id});
}

module.exports = PetService;


