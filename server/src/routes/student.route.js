const express = require('express')
const upload = require('../config/upload/multer')
const {body} = require('express-validator')
const {validateStudent} = require('../validation/student.validation')
const {studentController} = require('../controllers')
const { authMiddleware }= require('../middlewares')

const router = express.Router()

// CREATE student
router.post(
    '/add-student',
    // authMiddleware.verifyTokenAndAdmin,
    upload.single('student_pic'),
    studentController.createStudent)

// GET ALL student
router.get(
    '/all-student',
    // authMiddleware.verifyTokenAndAdmin,
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
    // authMiddleware.verifyTokenAndAdmin,
    studentController.updateStudentById)

// DELETE student
router.delete(
    '/delete-student/:studentId',
    // authMiddleware.verifyTokenAndAdmin,
    studentController.deleteStudentById)

module.exports = router