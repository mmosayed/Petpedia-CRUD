const pgp = require('pg-promise')({});
const db = pgp('postgres://localhost/petpedia');

const UserService = {};

UserService.create = () => {}

UserService.read = (id) => {
  return db.one(`SELECT name FROM users WHERE id=${id}`)
}

UserService.update = () => {}

UserService.delete = () => {}

module.exports = UserService;