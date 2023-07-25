const Joi = require('joi');

exports.createUserValidation = (req, res, next) => {
    // create schema object
    const createUser = Joi.object({
        name: Joi.string().optional(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    }).validate(req.body);



    if (createUser.error) {
        return res.send({
            status: false,
            message: createUser.error.details[0].message,
            data: null
        })
    }

    next();
}