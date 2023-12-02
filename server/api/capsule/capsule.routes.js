const Router = require('express-promise-router');
const router = Router();
const capsuleController = require("./capsule.controller");
const secured = require('../../config/middleware/secured');


/* GET METHODS */
router
    .route('/get_capsules')
    .get(secured(), capsuleController.getUserCapsules)

/* POST METHODS */
router
    .route('/update_capsule/:capsuleId')
    .post(secured(), capsuleController.updateCapsule)

router
    .route('/delete_capsule/:capsuleId')
    .post(secured(), capsuleController.deleteCapsule)

module.exports = router;