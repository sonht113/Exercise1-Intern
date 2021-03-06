const Student = require('../models/Student')

/**
 * Create new Student
 * @param firstname
 * @param lastname
 * @param age
 * @param classStu
 * @param avatar
 * @return {Promise<Student>}
 */
const createStudent = async ({firstname, lastname, age, classStudent, avatar}) => {
    return Student.create({
        firstname: firstname,
        lastname: lastname,
        age: age,
        classStudent: classStudent,
        avatar: avatar
    })
}

/**
 * Get all student
 * @return {Promise<{pagination: {limit, page}, students: Student[]}>}
 */
const queryStudent = async (page, limit) => {
    const pageNumber = page || 1

    const allStudent = await Student.find()
    const students = await Student.find().select("_id firstname lastname age classStudent avatar")
        .limit(limit)
        .skip((limit * pageNumber) - limit)
    const totalPage = (allStudent.length/limit).toFixed()
    return {
        students: students,
        pagination: {
            page: page,
            limit: limit,
            totalPage: totalPage
        }
    };
}

/**
 * Get student by Id
 * @param studentId
 * @return {Promise<Student>}
 */
const getStudentById = async (studentId) => {
    const student = await Student.findById(studentId);
    return student
}

/**
 *
 * @param firstname
 * @param lastname
 * @return {Promise<Student>}
 */
const getStudentByName = async (firstname, lastname) => {
    return Student.findOne({firstname: firstname, lastname: lastname})
}

/**
 * Update student by Id
 * @param studentId
 * @param studentBody
 * @return {Promise<Student>}
 */
const updateStudentById = async (studentId, studentBody) => {
    const student = await Student.findByIdAndUpdate(studentId, studentBody, {new: true});
    return student
}

/**
 * Delete student by id
 * @param studentId
 * @return {Promise<Query<any, any, {}, any>>}
 */
const deleteStudentById = async (studentId) => {
    return Student.findByIdAndDelete(studentId);
}

module.exports = {
    createStudent,
    queryStudent,
    getStudentById,
    getStudentByName,
    updateStudentById,
    deleteStudentById
}
