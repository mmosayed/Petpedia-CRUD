const pgp = require('pg-promise')({});
const db = pgp('postgres://localhost/petpedia');

const UserService = {};

UserService.create = (name, email) => {
  return db.none('INSERT INTO users (name, email) VALUES (${name}, ${email})', {name, email})
}

UserService.read = (id) => {
  return db.one('SELECT name FROM users WHERE id=${id}', {id: id});
}

UserService.update = (id, name, email) => {
  return db.none('UPDATE users SET name=${name}, email=${email} WHERE id=${id}', {id, name, email});
}

UserService.delete = (id) => {
  return db.none('DELETE FROM pets WHERE owner=${id}; DELETE FROM users WHERE id=${id}', {id});
}

module.exports = UserService;