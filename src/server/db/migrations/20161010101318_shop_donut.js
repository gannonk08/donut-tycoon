
exports.up = function(knex, Promise) {
  return knex.schema.createTable('shop_donut', (t) => {
      t.increments('uuid');
      t.integer('shop_id').notNullable();
      t.integer('donut_id').notNullable();

    });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('shop_donut');

};
