const faker = require('faker');
const donutTypeArray = ["chocolate", "glazed", "blazed", "cronut", "bearclaw", "sprinkle", "bacon", "eclair", "jelly"]
const toppingTypeArray = ["chocolate", "glaze", "weed", "flakes", "chocolate", "sprinkles", "bacon", "glaze", "glaze"]

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('donut').del()
    .then(function () {
      var fakeShopsArray = []
      for (var i = 0; i < donutTypeArray.length; i++) {
        fakeShopsArray.push(knex('donut').insert({
          donutName: donutTypeArray[i],
          topping: toppingTypeArray[i],
          price:faker.commerce.price(.10,5.00,2)
        }))
      }
      return Promise.all(fakeShopsArray);
    });
};
