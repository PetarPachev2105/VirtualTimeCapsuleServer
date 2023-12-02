const { Model } = require('objection');

class User extends Model {
    static get tableName() {
        return 'user';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['id', 'username', 'email', 'password'],

            properties: {
                id: { type: 'string' },
                username: { type: 'string', minLength: 1, maxLength: 255 },
                email: { type: 'string', minLength: 1, maxLength: 255 },
                password: { type: 'string', minLength: 1 },
                details: { type: 'object' }
            }
        };
    }

    static get relationMappings() {
        const Capsule = require('../capsule/capsule.model');

        return {
            capsules: {
                relation: Model.HasManyRelation,
                modelClass: Capsule,
                join: {
                    from: 'user.id',
                    to: 'capsule.user_id'
                }
            },
        };
    }
}

module.exports = User;
