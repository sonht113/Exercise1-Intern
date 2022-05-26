const {studentService} = require('../services/index')

/**
 * Create student
 */
const createStudent = async (req, res) => {
    try {
        console.log(req.body)
        let avatar
        if(req.file && req.file.filename) {
            avatar = `upload/images/${req.file.filename}`
        }
        const student = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age,
            classStudent: req.body.classStudent,
            avatar: avatar
        }
        await studentService.createStudent(student)
        return res.status(200).json(student)
    } catch (err) {
        return res.status(500).json(err.errors.avatar.message)
    }
}

/**
 * Get all students
 */
const getStudents = async (req, res) => {
    try {
        const students = await studentService.queryStudent(req.query.page, req.query.limit)
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
        let avatar
        if(req.file && req.file.filename) {
            avatar = `upload/images/${req.file.filename}`
        }
        const newStudent = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age,
            classStudent: req.body.classStudent,
            avatar: avatar
        }
        await studentService.updateStudentById(req.params.studentId, newStudent)
        return res.status(200).json(newStudent)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
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
