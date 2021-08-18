const CustomError = require("../../helpers/error/CustomError")
const jwt = require("jsonwebtoken")
const { isTokenInculuted, getAccessTokenFromHeader } = require("../../helpers/authorization/tokenHelpers")

const getAccessToRoute = (req, res, next) => {
    //token
    const { JWT_SECRET_KEY } = process.env
    if (!isTokenInculuted(req)) {
        return next(
            new CustomError("You are not authorized to access this route", 401)
        )
    }

    const accessToken = getAccessTokenFromHeader(req)

    jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(
                new CustomError("You are not authorized to access this route", 401)
            )
        }
        req.user = {
            id : decoded.id,
            email : decoded.email,
            first_name : decoded.first_name,
            last_name : decoded.last_name,
        }
    })
    next();


}

module.exports = {
    getAccessToRoute
}