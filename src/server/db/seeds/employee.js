const faker = require('faker');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('employee').del()
    .then(function () {
      var employeesArray = []
      for (var i = 0; i < 25; i++) {
        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()
        employeesArray.push(knex('employee').insert({
          first_name: firstName,
          last_name: lastName,
          email: faker.internet.email(firstName,lastName,"gmail.com"),
          favorite_donut: faker.random.number({min:1, max:9}),
          shop_id:faker.random.number({min:1, max:9})
        }))
      }
      return Promise.all(employeesArray);
    });
};
