import React, {useEffect, useRef, useState} from "react";
import {MdOutlineAccountCircle} from 'react-icons/md';
import {FaPlus} from 'react-icons/fa';
import {useAppDispatch, useAppSelector} from "../../app/hook";


import Header from "../../components/Header/Header";
import studentApi from "../../api/studentApi";
import {studentSlice} from "../../slice/studentSlice";
import {selectRemainingStudents} from "../../app/selector";
import {Student, StudentDocument} from "../../models/Student";
import Modal from "../../components/Modal/Modal";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import ListStudent from "../../components/ListStudent/ListStudent";
import {Pagination} from "@nextui-org/react";
import StudentForm from "./components/studentForm";


const StudentPage: React.FC = () => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false)
    const [file, setFile] = useState(null)
    const [validationFile, setValidationFile] = useState<string>("")
    // @ts-ignore
    const [studentModal, setStudentModal] = useState<StudentDocument>({})
    // @ts-ignore
    const [studentDelete, setStudentDelete] = useState<StudentDocument>({})
    //Error
    const [error, setError] = useState<string>("")

    const ref = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()

    const listStudent = useAppSelector(selectRemainingStudents).students

    // GET STUDENTS
    let getStudents = () => {
        studentApi
            .getAll(1, 3)
            .then((res) => {
                dispatch(studentSlice.actions.setStudents(res))
            })
            .catch((err: Error) => console.log(err))
        window.scroll( 0, 0);
    }
    useEffect(() => {
        getStudents()
    }, [])

    const handleChangeFile =(e: any) => {
        setFile(e.target.files[0])
        if(e.target.files.length) {
            setValidationFile("")
        } else {
            setValidationFile("Please choose image!")
        }
    }

    let formData = new FormData()
    Object.entries(studentModal).filter(value => value !== studentModal.avatar).forEach((value, index) => {
        formData.append(value[0], value[1])
    })
    // @ts-ignore
    formData.append('student_pic', file)

    // =================CREATE STUDENT======================
    const handleCreateStudent = (e: any) => {
        e.preventDefault()
        studentApi.add(formData)
            .then((res) => {
                setFile(null)
                // @ts-ignore
                ref.current.value = ""
                setError("")
                setIsOpenModal(false)
                getStudents()
            })
            .catch((err) => {
                setError(err.response.data)
            })
    }
    // ===============UPDATE STUDENT========================
    const handleUpdateStudent = (e: any) => {
        e.preventDefault()
        // @ts-ignore
        studentApi.update(studentModal._id, formData)
            .then((res) => {
                setFile(null)
                // @ts-ignore
                ref.current.value = ""
                setError("")
                setIsOpenModal(false)
                getStudents()
            })
            .catch((err) => {
                setError(err.response.data)
            })
    }
    // =================DELETE STUDENT========================
    const handleDeleteConfirm = (e: any) => {
        e.preventDefault()
        studentApi
            .delete(studentDelete._id)
            .then(() => {
                setIsOpenConfirmModal(false)
                getStudents()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    // CANCEL
    const handleCancel = () => {
        setIsOpenConfirmModal(false)
        setStudentDelete({})
    }
    // ===============EDIT UPDATE===================
    const handleEdit = (student: Student) => {

        setStudentModal(student)
        setIsOpenModal(true)
    }
    // ================EDIT DELETE=============
    const handleDelete = (student: Student) => {
        setIsOpenConfirmModal(true)
        setStudentDelete(student)
    }

    // @ts-ignore
    return(
        <div>
            <Header />
            <div className="relative h-[100vh] bg-[#F0F0F0]" >
                <div
                    className="absolute top-3 right-3 flex justify-center items-center w-[40px] h-[40px] rounded-full cursor-pointer z-20 bg-green-600 hover:scale-125 duration-150"
                    onClick={() => {
                        setStudentModal({} as StudentDocument)
                        setIsOpenModal(true)
                    }}
                >
                    <FaPlus className="text-md fill-white" />
                </div>
                {/*Modal*/}
                <Modal
                    setError={setError}
                    isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                >
                    <StudentForm
                        refCurrent={ref}
                        error={error}
                        validationFile={validationFile}
                        handleChangeFile={handleChangeFile}
                        studentModal={studentModal}
                        setStudentModal={setStudentModal}
                        handleCreateStudent={handleCreateStudent}
                        handleUpdateStudent={handleUpdateStudent}
                    />
                </Modal>

                {/*Confirm Modal*/}
                {
                    isOpenConfirmModal
                        ? <ConfirmModal
                            isOpenConfirmModal={isOpenConfirmModal}
                            student={studentDelete}
                            handleCancel={handleCancel}
                            handleDelete={handleDeleteConfirm}/>
                        : null
                }
                {/*List Student*/}
                <ListStudent
                    listStudent={listStudent}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}/>
                {/*Pagination*/}
                {/*<div  className="mt-10 flex justify-center">*/}
                {/*    <Pagination color="gradient" total={10} />*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

export default StudentPage;
