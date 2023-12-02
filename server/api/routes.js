const express = require('express');
const userRoutes = require('../api/user/user.routes');
const capsuleRoutes = require('../api/capsule/capsule.routes');
const insertCapsuleRoute = require('../api/capsule/insetCapsule.route');
const capsuleContentRoutes = require('../api/capsuleContent/capsuleContent.routes');

const router = express.Router();

// User routes
router.use('/users', userRoutes);

// Capsule routes
router.use('/capsules', capsuleRoutes);
router.use('/insert_capsules', insertCapsuleRoute);

// Capsule content routes
router.use('/capsule_contents', capsuleContentRoutes);

// Export the router
module.exports = router;