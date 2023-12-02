const Capsule = require('../../models/capsule/capsule.model');
const IDGenerator = require('../../utils/idGenerator');
const CapsuleContentService = require("../capsuleContent/capsuleContent.service");

exports.getCapsule = async function (capsuleId) {
    const capsule = await Capsule.query().findById(capsuleId);
    return capsule;
}

exports.updateCapsule = async function (capsuleId, payload) {
    await Capsule.query().patch(payload)
        .where('id', capsuleId);
}

exports.validateCapsuleOpenDate = function (date) {
    const datePattern = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    return datePattern.test(date);
}

exports.deleteCapsule = async function (capsuleId) {
    const capsule = await Capsule.query().findById(capsuleId);

    if (!capsule) return;

    await Capsule.query().delete().where('id', capsuleId);

    await CapsuleContentService.deleteCapsuleContent(capsuleId);
}

exports.getUserCapsules = async function (userId) {
    const capsules = await Capsule.query().where('user_id', userId);
    console.log(`${userId} has ${capsules.length} capsules`);
    return capsules;
}

exports.insertUserCapsule = async function (capsulePayload) {
    const capsuleId = IDGenerator.generateShortId();

    console.log(capsulePayload);
    const capsule = await Capsule.query().insert({
        id: capsuleId,
        user_id: capsulePayload.user_id,
        title: capsulePayload.title,
        open_date: capsulePayload.open_date,
    });
    return capsule;
}