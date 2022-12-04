const { createToken } = require('../helpers/token');
const User = require('../models/userModel');

const signUpUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.signup(email, password);

        return res
                  .status(200)
                  .json({
                    _id: user._id,
                    email: user.email,
                    cart: user.cart,
                    token: createToken(user._id, '7d')
                  })
    } catch(err) {
        return res
                  .status(400)
                  .json({
                    message: err.message
                  })
    }
}

const logInUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);

        return res
                  .status(200)
                  .json({
                    _id: user._id,
                    email,
                    cart: user.cart,
                    token: createToken(user._id, '7d')
                  })
    } catch(err) {
        return res
                  .status(400)
                  .json({
                    message: err.message
                  })
    }
}

module.exports = {signUpUser, logInUser}