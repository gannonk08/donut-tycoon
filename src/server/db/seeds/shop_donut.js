const faker = require('faker');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shop_donut').del()
    .then(function () {
      var joinArray = [];
      for (var i = 1; i <= 50; i++) {
        var shopID = faker.random.number({min:1, max:9});
        var donutID = faker.random.number({min:1, max:9});
        joinArray.push(knex('shop_donut').insert({
          shop_id: shopID,
          donut_id: donutID
        }))
      }
      return Promise.all(joinArray);
    });
};
