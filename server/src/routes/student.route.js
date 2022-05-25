const express = require('express')
const upload = require('../config/upload/multer')
const {studentController} = require('../controllers')
const {validate} = require('../middlewares/validate.middleware')
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
    studentController.getStudents)

// GET student detail
router.get(
    '/student-detail/:studentId',
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
    studentController.deleteStudentById)

module.exports = router;
