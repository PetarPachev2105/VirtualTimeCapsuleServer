exports.up = function(knex) {
    return knex.schema.createTable('capsule_content', function(table) {
        table.string('id').primary();
        table.string('capsule_id');
        table.string('type');
        table.jsonb('content');

        table.index(['capsule_id'], 'capsule_id');
        table.index(['capsule_id', 'type'], 'capsule_id__type');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('capsule_content');
};