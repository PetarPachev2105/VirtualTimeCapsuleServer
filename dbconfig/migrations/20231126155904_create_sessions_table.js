exports.up = function(knex) {
    return knex.schema.createTable('session', function(table) {
        table.string('id').primary();
        table.string('access_token');
        table.string('user_id');
        table.string('created_at');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('session');
};