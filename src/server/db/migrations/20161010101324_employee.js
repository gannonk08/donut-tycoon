
exports.up = function(knex, Promise) {
  return knex.schema.createTable('employee', (t) => {
      t.text('first_name').notNullable();
      t.text('last_name').notNullable();
      t.text('email').notNullable();
      t.integer('favorite_donut').references("id").inTable("donut");
      t.integer('shop_id').references("id").inTable("shop");
    });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('employee');

};
