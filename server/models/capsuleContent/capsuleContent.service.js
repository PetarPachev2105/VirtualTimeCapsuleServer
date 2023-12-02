const CapsuleContent = require('./capsuleContent.model');
const IDGenerator = require('../../utils/idGenerator');
const { AlabalaError, AlabalaErrorTypes } = require('../../utils/AlaBalaError');

exports.getCapsuleContent = async function (capsuleId) {
    console.log(`getCapsuleContent CALLED with ${capsuleId}`);
    return CapsuleContent.query().where('capsule_id', capsuleId);
}

exports.insertCapsuleContent = async function (capsuleId, type, content) {
    const capsuleContentId = IDGenerator.generateShortId();

    const capsuleContent = await CapsuleContent.query().insert({
        id: capsuleContentId,
        capsule_id: capsuleId,
        type: type,
        content: content,
    });

    return capsuleContent;
}

exports.deleteCapsuleContent = async function (capsuleId) {
    await CapsuleContent.query().delete()
        .where('capsule_id', capsuleId);
}