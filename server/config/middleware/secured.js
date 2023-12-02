const httpStatus = require('http-status');
const jwt = require('../../utils/jsonWebTokenHelper');
const SessionService = require('../../models/session/session.service');

module.exports = function () {
  return async function secured(req, res, next) {
    // console.log('secured middleware called');
    // console.log(`secured headers: ${JSON.stringify(req.headers)}`);

    if (req.headers['authorization']) {
      // console.log(`have token: ${req.headers.authorization}`);

      const validateToken = jwt.authenticateToken(req.headers['authorization']);

      // /* If we don't have a valid session object, exit */
      if (!validateToken) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          code: httpStatus.UNAUTHORIZED,
          message: 'Not logged in',
        });
      }

      const session = await SessionService.getSession(req.headers['authorization']);

      if (!session) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          code: httpStatus.BAD_REQUEST,
          message: 'Something went wrong',
        });
      }

      req.user = session.user;

      return next();
    }
    return res.status(httpStatus.UNAUTHORIZED).json({
      code: httpStatus.UNAUTHORIZED,
      message: 'Not logged in',
    });
  };
};