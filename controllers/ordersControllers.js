const { validatorName, validatorEmail, validatorNumber } = require('../helpers/validator');
const Order = require('../models/orderModel');
const User = require('../models/userModel');

const addOrder = async (req, res) => {
    const {products, firstName, lastName, email, phone, address, city, country} = req.body;

    if(!validatorName(firstName) || !validatorName(lastName)) {
        return res
                  .status(400)
                  .json({
                    message: 'Please use a valid name!'
                  })
    }

    if(!validatorEmail(email)) {
        return res
                  .status(400)
                  .json({
                    message: 'Invalid email!'
                  })
    }

    console.log(phone);

    if(!validatorNumber(phone)) {
        return res
                  .status(400)
                  .json({
                    message: 'Invalid Phone number!'
                  })
    }

    try {
        await Order.create({products, firstName, lastName, email, address, phone, city, country});

        return res
                  .status(200)
                  .json({
                    success: true,
                    message: 'Order has been made successfuly!'
                  })
    } catch(err) {
        return res
                  .status(400)
                  .json({
                    message: err.message
                  })
    }
}

const getOrders = async (req, res) => {
    const user = await User.findOne({_id: req.userId});

    if(!user.isAdmin) {
        return res
                  .status(400)
                  .json({
                    message: 'Access denied.'
                  })
    }

    const orders = await Order.find({});

    if(!orders) {
        return res
                  .status(400)
                  .json({
                    message: 'No order was found!'
                  })
    }

    return res
              .status(200)
              .json({
                orders
              })
}

module.exports = {addOrder, getOrders}