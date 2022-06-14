const { verify } = require('jsonwebtoken');

const verifyUser = function (req, res, next) {
    try {
        const token = req.header("accessToken");
        if (!token) return res.sendStatus(401)
        const validToken = verify(token, process.env.JWT_TOKEN);
        req.user = validToken;

        if (validToken) {
            return next()
        }
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = { verifyUser }