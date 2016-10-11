const faker = require('faker');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shop').del()
    .then(function () {
      var fakeShopsArray = []
      for (var i = 0; i < 9; i++) {
        fakeShopsArray.push(knex('shop').insert({
          name: faker.company.companyName() + " Donuts",
          city: faker.address.city()
        }))
      }
      return Promise.all(fakeShopsArray);
    });
};
