const asyncJS = require('async');
const CapsuleService = require('../../models/capsule/capsule.service');
const CapsuleContentService = require('../../models/capsuleContent/capsuleContent.service');
const httpStatus = require('http-status');
const { AlabalaError, AlabalaErrorTypes } = require('../../utils/AlaBalaError');

exports.getCapsuleContent = async (req, res) => {
    console.log(`getCapsuleContent was CALLED with ${JSON.stringify(req.params)}`);

    const capsuleId = req.params.capsuleId;

    if (!capsuleId) throw new AlabalaError(AlabalaErrorTypes.MISSING_INPUTS, 'Missing Capsule');

    const capsule = await CapsuleService.getCapsule(capsuleId);

    if (!capsule) throw new AlabalaError(AlabalaErrorTypes.BAD_INPUTS, 'Invalid Capsule');

    if (!capsule.open_date || new Date(capsule.open_date).getTime() > new Date().getTime()) throw new AlabalaError(AlabalaErrorTypes.BAD_INPUTS, 'Its locked');

    const capsuleContents = await CapsuleContentService.getCapsuleContent(capsuleId);

    res.status(httpStatus.OK);
    res.json({ capsuleContents });
}

exports.insertCapsules = async (req, res) => {
    console.log(`insertCapsules was CALLED with ${JSON.stringify(req.body)}`);

    console.log(`req.user: ${JSON.stringify(req.user)}`);

    if (!req.user || !req.user.id) throw new AlabalaError(AlabalaErrorTypes.MISSING_INPUTS, 'No user was specified');

    console.log(req.body);

    const capsulePayload = {
        title: req.body.title,
        open_date: req.body.openDate,
        user_id: req.user.id,
    };

    const capsule = await CapsuleService.insertUserCapsule(capsulePayload);

    if (!capsule) throw new AlabalaError(AlabalaErrorTypes.INTERNAL_SERVER_ERROR, 'Failed to insert capsule');

    if (req.body.capsuleContent) {
        const capsuleContent = req.body.capsuleContent;

        if (capsuleContent.images) {
            await asyncJS.eachLimit(capsuleContent.images, 5, async (image) => {
                await CapsuleContentService.insertCapsuleContent(capsule.id, 'image', image);
            });
            await CapsuleContentService.insertCapsuleContent(capsule.id, 'text', { message: capsuleContent.message });
        }
    }

    res.status(httpStatus.OK);
    res.json({});
}