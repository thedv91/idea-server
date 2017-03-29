import _ from 'lodash';


class AuthPolicy {

    constructor() {

    }

    requireLogin(req, res, next) {
        if (!req.auth) {
            return res.status(403).json({
                message: 'User is not authorized'
            });
        } else {
            return next();
        }
    }

    requireAdmin(req, res, next) {
        const roles = ['user'];
        if (!_.intersection(req.auth.roles, roles).length) {
            return res.status(403).json({
                message: 'User is not authorized'
            });
        } else {
            return next();
        }
    }
}

export default new AuthPolicy();