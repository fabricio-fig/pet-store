/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex('employees').del()
    .then(function () {
      //After insert the next:
      return knex('employees').insert([
        {
          id: 1,
          name: 'Maria Admin',
          email: 'maria@pettopstore.com',
          password: bcrypt.hashSync('123456', 10),
          is_admin: true 
        },
        {
          id: 2,
          name: 'João Vendedor',
          email: 'joao@pettopstore.com',
          password: bcrypt.hashSync('654321', 10),
          is_admin: false
        },
      ]);

    });
};
