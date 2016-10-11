
exports.up = function(knex, Promise) {
  return knex.schema.createTable('donut', (t) => {
      t.increments();
      t.text('donutName').notNullable();
      t.text('topping').notNullable();
      t.float('price').notNullable();

    });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('donut');

};
