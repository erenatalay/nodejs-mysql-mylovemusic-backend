const sendJwtClient = (user,res) => {
    const token = user.generateJwtFromUser();

    const {JWT_COOKIE,NODE_ENV} = process.env;

    return res
    .status(200)
    .cookie("access_token",token,{
        httpOnly : true,
        expires : new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 *60),
        sucure : NODE_ENV === "development" ? false : true
    })
    .json({
        success :true,
        access_token : token,
        data : {
            first_name : user.first_name,
            last_name : user.last_name,
            email : user.email
        }
    })
    
  
}

const isTokenInculuted = (req) => {
    return (
        req.headers.authorization && req.headers.authorization.startsWith("Bearer:")
        );
}


const getAccessTokenFromHeader = (req) => {
    const authorization = req.headers.authorization;//tokeni aldık
    const access_token = authorization.substr(7)
    return access_token;
}

module.exports = {
    sendJwtClient,
    isTokenInculuted,
    getAccessTokenFromHeader
};