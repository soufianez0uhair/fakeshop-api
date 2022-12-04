require('dotenv').config();
const jwt = require('jsonwebtoken');

const createToken = (_id, expiresIn) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn});
}

const verifyToken = (req, res, next) => {
    const {authorization} = req.headers;

    if(!authorization) {
        return res
                  .status(400)
                  .json({
                    message: 'Authorization is required!'
                  })
    }

    console.log(authorization);

    const token = authorization.split(' ')[1];

    const {_id} = jwt.verify(token, process.env.SECRET);

    if(!_id) {
        return res
                  .status(400)
                  .json({
                    message: 'Invalid token!'
                  })
    }

    req.userId = _id;

    next();
}

module.exports = {createToken, verifyToken};