const Router = require('express-promise-router');
const router = Router();
const capsuleContentController = require("./capsuleContent.controller");
const secured = require('../../config/middleware/secured');


/* GET METHODS */
router
    .route('/get_capsule_contents/:capsuleId')
    .get(secured(), capsuleContentController.getCapsuleContent)

module.exports = router;