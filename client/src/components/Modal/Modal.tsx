import React, {useEffect, useRef, useState} from "react";
import {IoCloseCircleSharp} from "react-icons/io5";
import studentApi from "../../api/studentApi";
import Input from "../Shared/Form/Input";
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
    const [validationFile, setValidationFile] = useState<string>("")
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
        if(e.target.files.length) {
            setValidationFile("")
        } else {
            setValidationFile("Please choose image!")
        }
    }

    useEffect(() => {
        setStudent(studentModal)
    }, [studentModal]);

    let formData = new FormData()
    Object.entries(student).filter(value => value !== student.avatar).forEach((value, index) => {
        formData.append(value[0], value[1])
    })
    // @ts-ignore
    formData.append('student_pic', file)

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
                ? "fixed w-full min-h-screen top-0 left-0 z-30 flex items-start justify-center transition"
                : "fixed w-full min-h-screen top-0 left-0 z-[1000] flex items-start justify-center invisible opacity-0 scale-50 transition"}
        >
            <a className="w-full min-h-screen top-0 left-0 absolute bg-black opacity-80 z-[1] duration-200 transform delay-600"
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
                    <form className="w-[50%] form overflow-y-auto overflow-x-hidden py-10 px-5 bg-white rounded-2xl">
                        <div className="grid xl:grid-cols-2 xl:gap-6">
                            {/*firstname*/}
                            <Input
                                label={"firstname"}
                                type={"text"}
                                content={student.firstname}
                                onChange={(text) => {
                                    setStudent({...student, firstname: text})
                                }}
                            />
                            {/*lastname*/}
                            <Input
                                label={"lastname"}
                                type={"string"}
                                content={student.lastname}
                                onChange={(text) => {
                                    setStudent({...student, lastname: text})
                                }}
                            />
                        </div>
                        {/*age*/}
                        <Input
                            label={"age"}
                            type={"number"}
                            content={student.age}
                            onChange={(text) => {
                                setStudent({...student, age: text})
                            }}
                        />
                        {/*class*/}
                        <Input
                            label={"class"}
                            type={"text"}
                            content={student.classStudent}
                            onChange={(text) => {
                                setStudent({...student, classStudent: text})
                            }}
                        />
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
                            {
                                validationFile && <span className="text-xs text-red-600">{validationFile}</span>
                            }
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