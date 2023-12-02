exports.up = function(knex) {
    return knex.schema.createTable('capsule', function(table) {
        table.string('id').primary();
        table.string('user_id');
        table.string('title');
        table.string('open_date');

        table.index(['user_id'], 'user_id');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('capsule');
};