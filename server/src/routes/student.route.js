const express = require('express')
const {body} = require('express-validator')
const upload = require('../config/upload/multer')
const {studentController} = require('../controllers')
const validate = require('../middlewares/validate')
const { studentValidation } = require('../validation')
const router = express.Router()

// CREATE student
router.post(
    '/add-student',
    upload.single('student_pic'),
    validate(studentValidation.createStudent),
    studentController.createStudent)

// GET ALL student
router.get(
    '/all-student',
    validate(studentValidation.getStudents),
    studentController.getStudents)

// GET student detail
router.get(
    '/student-detail/:studentId',
    // authMiddleware.verifyTokenAndAdmin,
    studentController.getStudentById)

// UPDATE student
router.put(
    '/update-student/:studentId',
    upload.single('student_pic'),
    validate(studentValidation.updateStudent),
    studentController.updateStudentById)

// DELETE student
router.delete(
    '/delete-student/:studentId',
    validate(studentValidation.deleteStudent),
    studentController.deleteStudentById)

module.exports = router;
