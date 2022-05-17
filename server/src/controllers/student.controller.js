const {studentService} = require('../services/index')
const { validationResult } = require('express-validator')

/**
 * Create student
 */
const createStudent = async (req, res) => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const student = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age,
            classStudent: req.body.classStudent,
            avatar: `upload/images/${req.file.filename}`
        }
        const studentByName = await studentService.getStudentByName(student.firstname, student.lastname)
        if(studentByName) {
            return res.status(400).json('Student is exist!')
        }
        await studentService.createStudent(student)
        return res.status(200).json(student)
    } catch (err) {
        console.log(err)
        return res.status(500).json('Can not add student!')
    }
}

/**
 * Get all students
 */
const getStudents = async (req, res) => {
    try {
        const students = await studentService.queryStudent(req.query.page, req.query.limit)
        if(students.length === 0) {
            return res.status(404).json('Not found any student!')
        }
        return res.status(200).json(students)
    } catch (e) {
        return res.status(500).json(e)
    }
}

/**
 * Get student by id
 */
const getStudentById = async (req, res) => {
    try {
       const student = await studentService.getStudentById(req.params.studentId)
        if(!student) {
            return res.status(404).json('Not found!')
        }
        return res.status(200).json(student)
    } catch (err) {
        return res.status(500).json(err)
    }
}

/**
 * Update student by id
 */
const updateStudentById = async (req, res) => {
    try {
        const student = await studentService.getStudentById(req.params.studentId)
        if(!student) {
            return res.status.json('Not found student!')
        }
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newStudent = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age,
            classStudent: req.body.classStudent,
            avatar: `upload/images/${req.file.filename}`
        }
        if(newStudent.firstname === student.firstname && newStudent.lastname === student.lastname) {
            await studentService.updateStudentById(req.params.studentId, newStudent)
        } else {
            const studentByName = await studentService.getStudentByName(newStudent.firstname, newStudent.lastname)
            if(studentByName) {
                return res.status(500).json('Student is exist!')
            }
            await studentService.updateStudentById(req.params.studentId, newStudent)
            return res.status(200).json(newStudent)
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}

const deleteStudentById = async (req, res) => {
    try {
        const student = await studentService.getStudentById(req.params.studentId)
        if(!student) {
            return res.status(404).json('Not found student!')
        }
        await studentService.deleteStudentById(req.params.studentId)
        return res.status(200).json('Delete successfully!')
    } catch (e) {
        return res.status(500).json(e)
    }
}

module.exports = {
    createStudent,
    getStudents,
    getStudentById,
    updateStudentById,
    deleteStudentById
}
