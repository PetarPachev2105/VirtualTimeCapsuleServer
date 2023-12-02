const express = require('express');
const pako = require('pako');
const router = express.Router();
const secured = require('../../config/middleware/secured');

const capsuleController = require('./capsule.controller');
const {AlabalaError, AlabalaErrorTypes} = require("../../utils/AlaBalaError");

// Middleware for gzip compressed payload
const gzipMiddleware = express.raw({ type: 'application/gzip', limit: '10mb' });

router.post('/insert_capsules', secured(), gzipMiddleware, async (req, res) => {
    try {
        const decompressedData = pako.ungzip(req.body, { to: 'string' });
        const jsonData = JSON.parse(decompressedData);
        req.body = jsonData;
        await capsuleController.insertCapsules(req, res);
    } catch (err) {
        if (err.name === 'AlabalaError') {
            res.status(err.statusCode).json({ message: err.message });
        } else {
            /* For any other error - send a generic error to ensure that we don't leak information */
            console.error(`error stack: ${err.stack}`);
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
});

module.exports = router;
