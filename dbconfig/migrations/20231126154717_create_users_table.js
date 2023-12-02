exports.up = function(knex) {
    return knex.schema.createTable('user', function(table) {
        table.string('id').primary();
        table.string('username').unique();
        table.string('email').unique();
        table.string('password');
        table.jsonb('details');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('user');
};