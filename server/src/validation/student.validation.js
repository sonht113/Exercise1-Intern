const {check} = require('express-validator')

const validateCreateStudent = () => {
    return [
        check('firstname', 'firstname does not Empty').not().isEmpty({ignore_whitespace: false}),
        check('lastname', 'lastname does not Empty').not().isEmpty({ignore_whitespace: true}),
        check('age', 'age does not Empty and not < 6').not().isEmpty(),
        check('class', 'class does not Empty').not().isEmpty(),
        check('avatar', 'avatar does not Empty').not().isEmpty({ignore_whitespace: false})
    ]
}

const validateStudent = {
    validateCreateStudent: validateCreateStudent
}

module.exports = {validateStudent}