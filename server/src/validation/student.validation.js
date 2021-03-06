const Joi = require('joi')

const createStudent = Joi.object().keys(
    {
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        age: Joi.number().integer().required(),
        classStudent: Joi.string().required()
    }
)

const updateStudent = Joi.object()
    .keys({
        firstname: Joi.string().empty(' '),
        lastname: Joi.string().empty(' '),
        age: Joi.number().integer().empty(' '),
        classStudent: Joi.string().empty(' '),
        avatar: Joi.allow(),
        student_pic: Joi.any().allow()
    })
    .min(1)

module.exports = {
    createStudent,
    updateStudent,
}
