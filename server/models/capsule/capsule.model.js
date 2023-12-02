const { Model } = require('objection');

class Capsule extends Model {
    static get tableName() {
        return 'capsule';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['id', 'user_id', 'title', 'open_date'],

            properties: {
                id: { type: 'string' },
                user_id: { type: 'string', minLength: 1, maxLength: 255 },
                title: { type: 'string', minLength: 1, maxLength: 255 },
                open_date: { type: 'string', minLength: 10 },
            }
        };
    }

    static get relationMappings() {
        const User = require('../user/user.model');
        const CapsuleContent = require('../capsuleContent/capsuleContent.model');

        return {
            user: {
                relation: Model.HasOneRelation,
                modelClass: User,
                join: {
                    from: 'capsule.user_id',
                    to: 'user.id'
                }
            },
            capsuleContents: {
                relation: Model.HasManyRelation,
                modelClass: CapsuleContent,
                join: {
                    from: 'capsule.id',
                    to: 'capsule_content.capsule_id'
                }
            }
        };
    }
}

module.exports = Capsule;
