import React, {useEffect, useRef, useState} from "react";
import {IoCloseCircleSharp} from "react-icons/io5";
import studentApi from "../../api/studentApi";
import FirstNameInput from "../Shared/Form/FirstNameInput";
import {StudentDocument} from "../../models/Student";


interface modalProp {
    isOpenModal: boolean;
    setIsOpenModal: any;
    setCheckStudent: any;
    studentModal: StudentDocument;
};

interface Validation {
    firstnameErr: string;
    lastnameErr: string;
    ageErr: string;
    classErr: string;
    fileErr: string;
}


const Modal: React.FC<modalProp> = (props) => {
    const {isOpenModal, setIsOpenModal, setCheckStudent, studentModal} = props
    const [file, setFile] = useState(null)
    const [student, setStudent] = useState<StudentDocument>({
        _id: "",
        firstname: "",
        lastname: "",
        age: "",
        classStudent: "",
        avatar: ""
    })
    //Error
    const [validation, setValidation] = useState<Validation>({
        firstnameErr: "",
        lastnameErr: "",
        ageErr: "",
        classErr: "",
        fileErr: ""
    })
    const [error, setError] = useState<string>("")

    const ref = useRef<HTMLInputElement>(null) ;
    const handleChangeFile =(e: any) => {
        setFile(e.target.files[0])
    }

    useEffect(() => {
        setStudent(studentModal)
    }, [studentModal]);

    let formData = new FormData()
    if(student._id) {
        formData.append('firstname', student.firstname)
        formData.append('lastname', student.lastname)
        formData.append('age', student.age)
        formData.append('classStudent', student.classStudent)
        // @ts-ignore
        formData.append('student_pic', file)
    }

    // CREATE STUDENT
    const handleCreateStudent = (e: any) => {
        e.preventDefault()
        studentApi.add(formData)
            .then((res) => {
                setFile(null)
                setCheckStudent(true)
                // @ts-ignore
                ref.current.value = ""
                setError("")
                setIsOpenModal(false)
            })
            .catch((err) => {
                setError(err.response.data)
                setCheckStudent(false)
            })
    }

    // UPDATE STUDENT
    const handleUpdateStudent = (e: any) => {
        e.preventDefault()
        // @ts-ignore
        studentApi.update(student._id, formData)
            .then((res) => {
                setFile(null)
                // @ts-ignore
                ref.current.value = ""
                setCheckStudent(true)
                setError("")
                setIsOpenModal(false)
            })
            .catch((err) => {
                setCheckStudent(false)
                return setError(err.response.data)
            })
    }

    return(
        <div className={
            isOpenModal
                ? "fixed w-full h-[100%] top-0 left-0 z-30 flex items-start justify-center transition"
                : "fixed w-full h-[100%] top-0 left-0 z-[1000] flex items-start justify-center invisible opacity-0 scale-50 transition"}
        >
            <a className="w-full h-[100%] top-0 left-0 absolute bg-black opacity-80 z-[1] duration-200 transform delay-600"
                onClick={() => {
                    setIsOpenModal(false)
                    setError("")
                    setValidation({...validation, firstnameErr: ""})
            }}></a>
            <div className="modal relative w-full z-[2]">
                <button className="close-modal absolute top-3 right-5" onClick={() => {
                    setIsOpenModal(false)
                    setError("")
                    setValidation({...validation, firstnameErr: ""})
                }}>
                    <IoCloseCircleSharp className="text-5xl fill-white" />
                </button>
                <div className="modal-title mt-5">
                    <h2 className="text-center text-white text-2xl font-bold">{ student._id ? "Update Student" : "Create Student" }</h2>
                </div>
                <div className="form-data relative flex justify-center mt-5">
                    {
                        error ? (
                            <div className="absolute top-3 left-0 right-0 w-[200px] mx-auto font-bold text-center translate-[50%] z-[5] text-xs text-red-600">{error}</div>
                        ) : null
                    }
                    <div></div>
                    <form className="w-[50%] py-10 px-5 bg-white rounded-2xl">
                        <div className="grid xl:grid-cols-2 xl:gap-6">
                            {/*firstname*/}
                            <FirstNameInput
                                validation={validation}
                                setValidation={setValidation}
                                student={student}
                                onChange={(text) => {
                                    console.log(text)
                                }}
                            />
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" name="lastname" id="floating_last_name"
                                       className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                       required={true}
                                       value={student._id ? student.lastname || '' : ''}/>
                                <label htmlFor="floating_last_name"
                                       className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Last name</label>
                            </div>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" name="age"
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                   required={true}
                                   value={student._id ? student.age || '' : ''}/>
                            <label htmlFor="floating_age"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Age
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" name="classStudent" id="floating_class"
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                   required={true}
                                   value={student._id ? student.classStudent || '' : ''} />
                            <label htmlFor="floating_password"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >Class</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                                   htmlFor="student_avatar">Upload file</label>
                            <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                aria-describedby="student_avatar_help"
                                name="student_pic"
                                ref={ref}
                                id="student_avatar"
                                onChange={handleChangeFile}
                                required={true}
                                type="file" />
                            <div className="mt-1 text-sm text-gray-500 dark:text-gray-500" id="student_avatar_help">
                                A profile picture for student!
                            </div>
                        </div>
                        <button type="submit"
                                onClick={student._id ? handleUpdateStudent : handleCreateStudent}
                                className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            {student._id ? "Update" : "Create"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Modal;