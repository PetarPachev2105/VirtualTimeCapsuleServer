const { Model } = require('objection');

class CapsuleContent extends Model {
    static get tableName() {
        return 'capsule_content';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['id', 'capsule_id', 'type'],

            properties: {
                id: { type: 'string' },
                capsule_id: { type: 'string'},
                type: { type: 'string', enum: ['text', 'image'] },
                content: { type: 'object'},
            }
        };
    }

    static get relationMappings() {
        const Capsule = require('../capsule/capsule.model');

        return {
            capsules: {
                relation: Model.HasOneRelation,
                modelClass: Capsule,
                join: {
                    from: 'capsule_content.capsule_id',
                    to: 'capsule.id'
                }
            },
        };
    }
}

module.exports = CapsuleContent;
