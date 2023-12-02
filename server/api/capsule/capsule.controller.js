const asyncJS = require('async');
const CapsuleService = require('../../models/capsule/capsule.service');
const CapsuleContentService = require('../../models/capsuleContent/capsuleContent.service');
const httpStatus = require('http-status');
const { AlabalaError, AlabalaErrorTypes } = require('../../utils/AlaBalaError');

exports.getUserCapsules = async (req, res) => {
    console.log(`getUserCapsules was CALLED with ${JSON.stringify(req.body)}`);

    if (!req.user || !req.user.id) throw new AlabalaError(AlabalaErrorTypes.MISSING_INPUTS, 'No user was specified');

    const capsules = await CapsuleService.getUserCapsules(req.user.id);

    res.status(httpStatus.OK);
    res.json({ capsules });
}

exports.insertCapsules = async (req, res) => {
    console.log(`insertCapsules was CALLED with ${JSON.stringify(req.body)}`);

    console.log(`req.user: ${JSON.stringify(req.user)}`);

    if (!req.user || !req.user.id) throw new AlabalaError(AlabalaErrorTypes.MISSING_INPUTS, 'No user was specified');

    if (req.body.openDate && !CapsuleService.validateCapsuleOpenDate(req.body.openDate)) throw new AlabalaError(AlabalaErrorTypes.BAD_INPUTS, 'Invalid Capsule Date');

    const open_date = new Date(req.body.openDate);

    if (isNaN(open_date)) throw new AlabalaError(AlabalaErrorTypes.BAD_INPUTS, 'Invalid Capsule Date');

    let date = open_date;

    if (!isNaN(open_date)) {
        let day = open_date.getDate();
        day = day < 10 ? "0" + day : day;
        let month = open_date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        const year = open_date.getFullYear();

        date = `${year}-${month}-${day}`;
    }

    const capsulePayload = {
        title: req.body.title,
        open_date: date,
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

exports.updateCapsule = async (req, res) => {
    console.log(`updateCapsule was CALLED with ${JSON.stringify(req.body)}`);

    if (!req.params.capsuleId) throw new AlabalaError(AlabalaErrorTypes.MISSING_INPUTS, 'No capsule was specified');

    const capsule = await CapsuleService.getCapsule(req.params.capsuleId);

    if (!capsule) throw new AlabalaError(AlabalaErrorTypes.BAD_INPUTS, 'Invalid Capsule');

    if (capsule.user_id !== req.user.id) throw new AlabalaError(AlabalaErrorTypes.UNAUTHORIZED, 'This capsule is not yours');

    if (req.body.open_date && !CapsuleService.validateCapsuleOpenDate(req.body.open_date)) throw new AlabalaError(AlabalaErrorTypes.BAD_INPUTS, 'Invalid Capsule Date');

    const open_date = new Date(req.body.open_date || capsule.open_date);

    if (isNaN(open_date)) throw new AlabalaError(AlabalaErrorTypes.BAD_INPUTS, 'Invalid Capsule Date');

    let date = open_date;

    if (!isNaN(open_date)) {
        let day = open_date.getDate();
        day = day < 10 ? "0" + day : day;
        let month = open_date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        const year = open_date.getFullYear();

        date = `${year}-${month}-${day}`;
    }

    const payload = {
        title: req.body.title || capsule.title,
        open_date: date,
    }

    await CapsuleService.updateCapsule(req.params.capsuleId, payload);

    res.status(httpStatus.OK);
    res.json({});
}

exports.deleteCapsule = async (req, res) => {
    console.log(`deleteCapsule was CALLED with ${JSON.stringify(req.params)}`);

    if (!req.params.capsuleId) throw new AlabalaError(AlabalaErrorTypes.MISSING_INPUTS, 'No capsule was specified');

    const capsule = await CapsuleService.getCapsule(req.params.capsuleId);

    if (!capsule) throw new AlabalaError(AlabalaErrorTypes.BAD_INPUTS, 'Invalid Capsule');

    if (capsule.user_id !== req.user.id) throw new AlabalaError(AlabalaErrorTypes.UNAUTHORIZED, 'This capsule is not yours');

    await CapsuleService.deleteCapsule(capsule.id);

    res.status(httpStatus.OK);
    res.json({});
}