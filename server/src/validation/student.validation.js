const Joi = require('joi')
const {objectId} = require('./custom.validation')

const createStudent = {
      body: Joi.object().keys({
            firstname: Joi.string().required(),
            lastname: Joi.string().required(),
            age: Joi.number().integer().required(),
            classStudent: Joi.string().required(),
            avatar: Joi.any()
      })
}

const getStudents = {
      query: Joi.object().keys({
            limit: Joi.number().integer(),
            page: Joi.number().integer(),
      })
}

const updateStudent = {
      params: Joi.object().keys({
            studentId: Joi.required().custom(objectId),
      }),
      body: Joi.object()
            .keys({
                  firstname: Joi.string().required(),
                  lastname: Joi.string().required(),
                  age: Joi.number().integer().required(),
                  classStudent: Joi.string().required(),
                  avatar: Joi.any()
            })
}

const deleteStudent = {
      params: Joi.object().keys({
            productId: Joi.string().custom(objectId),
      }),
}

module.exports = {
      createStudent,
      getStudents,
      updateStudent,
      deleteStudent
}