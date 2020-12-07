const jwt = require('jsonwebtoken');

const getToken = (user) => {
    return jwt.sign({
        _id:user._id,
        name:user.name,
        email:user.email,
        password:user.password,
        isAdmin:user.isAdmin,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
        expiresIn:'48h'
    })
}


const isAuth = (req,res,next) => {

    const token  = req.headers.authorization.split(' ')[1];

    if(req.headers.authorization && token){
        jwt.verify(token,process.env.JWT_SECRET || 'somethingsecret',(err,decode) => {
            if(err){
                return res.status(401).send({msg:'Invalid token'});
            }

            req.user = token;

            next()
            return
        })
    }

    return res.status(401).send({msg:'Token is not supplied'})

}


const isAdmin = (req,res,next) => {
    if(req.user && req.user.isAdmin){
        return next()
    }

    return res.status(401).send({msg:'Admin Token is not valid'})
}

module.exports = {
    getToken,
    isAuth,
    isAdmin
}