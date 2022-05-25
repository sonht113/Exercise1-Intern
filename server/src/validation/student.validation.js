const Joi = require('joi')

const createStudent = Joi.object().keys(
    {
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        age: Joi.number().integer().required(),
        classStudent: Joi.string().required(),
        student_pic: Joi.any().allow()
    }
)

const updateStudent = Joi.object()
    .keys({
        firstname: Joi.string().empty(' '),
        lastname: Joi.string().empty(' '),
        age: Joi.number().integer().empty(' '),
        classStudent: Joi.string().empty(' '),
        student_pic: Joi.any().allow()
    })
    .min(1)

module.exports = {
      createStudent,
      updateStudent,
}
