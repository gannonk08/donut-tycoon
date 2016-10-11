exports.up = function(knex, Promise) {
  return knex.schema.createTable('shop', (t) => {
      t.increments();
      t.text('name').notNullable();
      t.text('city').notNullable();
    });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('shop');

};
