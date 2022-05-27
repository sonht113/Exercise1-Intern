import React, {useEffect, useRef, useState} from "react";
import {FaPlus} from 'react-icons/fa';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {Pagination} from "@nextui-org/react";

import Header from "../../components/Header/Header";
import studentApi from "../../api/studentApi";
import {studentSlice} from "../../slice/studentSlice";
import {selectRemainingStudents} from "../../app/selector";
import {Student, StudentDocument} from "../../models/Student";
import Modal from "../../components/Modal/Modal";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import ListStudent from "../../components/ListStudent/ListStudent";
import StudentForm from "./components/studentForm";
import {ErrorDocument} from "../../models/Error";
import {validate} from "../../validation/studentValidation";

const StudentPage: React.FC = () => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false)
    const [file, setFile] = useState(null)
    const [checkUpdate, setCheckUpdate] = useState<boolean>(false)
    const [totalPage, setTotalPage] = useState<number>(1)
    const [pageNumber, setPageNumber] = useState<number>(1)
    // @ts-ignore
    const [studentModal, setStudentModal] = useState<StudentDocument>({})
    const [idStudentUpdate, setIdStudentUpdate] = useState<string | undefined>("")
    // @ts-ignore
    const [studentDelete, setStudentDelete] = useState<StudentDocument>({})
    //Error
    const [error, setError] = useState<any>(null)
    const [messageErr, setMessageErr] = useState<ErrorDocument>({
        firstname: "" ,
        lastname: "",
        age: "",
        classStudent: "",
        student_pic: ""
    })
    const ref = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()

    const listStudent = useAppSelector(selectRemainingStudents).students

    // ================GET STUDENTS======================
    let getStudents = () => {
        studentApi
            .getAll(pageNumber, 4)
            .then((res) => {
                setTotalPage(res.pagination.totalPage)
                dispatch(studentSlice.actions.setStudents(res))
            })
            .catch((err: Error) => console.log(err))
        window.scroll( 0, 0);
    }
    useEffect(() => {
        getStudents()
    }, [])

    const handleChangeFile = (e: any) => {
        setFile(e.target.files[0])
        if(e.target.files.length) {
            setMessageErr({...messageErr, student_pic: ""})
        } else {
            setMessageErr({...messageErr, student_pic: "Please choose image!"})
        }
    }

    let formData = new FormData()
    Object.entries(studentModal).forEach((value, index) => {
        formData.append(value[0], value[1])
    })
    // @ts-ignore
    formData.append('student_pic', file)

    // =================CREATE STUDENT======================
    const handleCreateStudent = (e: any) => {
        e.preventDefault()
        // @ts-ignore
        studentApi.add(formData)
            .then((res) => {
                setFile(null)
                // @ts-ignore
                ref.current.value = ""
                setError(null)
                setIsOpenModal(false)
                getStudents()
            })
            .catch((err) => {
                console.log(err)
                setError(err.response.data.details)
            })
    }

    useEffect(() => {
        let obErr:ErrorDocument = messageErr
        if(error !== null) {
            error.forEach((item: any) => {
                obErr = ({...obErr, [item.context.label]: item.message})
            })
            setMessageErr(obErr)
        } else {
            setMessageErr(obErr)
        }
    }, [error])

    // ===============UPDATE STUDENT========================"
    const handleUpdateStudent = (e: any) => {
        e.preventDefault()
        // @ts-ignore
        studentApi.update(idStudentUpdate, formData)
            .then((res) => {
                setFile(null)
                // @ts-ignore
                ref.current.value = ""
                setError(null)
                setIsOpenModal(false)
                getStudents()
            })
            .catch((err) => {
                setError(err.response.data.details)
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

    // ===============CANCEL======================
    const handleCancel = () => {
        setIsOpenConfirmModal(false)
        setStudentDelete({})
    }

    // ===============EDIT UPDATE===================
    const handleEdit = (student: Student) => {
        setCheckUpdate(true)
        setStudentModal({...studentModal,
            firstname: student.firstname,
            lastname: student.lastname,
            age: student.age,
            classStudent: student.classStudent,
            avatar: student.avatar
        })
        setIdStudentUpdate(student._id)
        setIsOpenModal(true)
    }

    // ================EDIT DELETE=============
    const handleDelete = (student: Student) => {
        setIsOpenConfirmModal(true)
        setStudentDelete(student)
    }

    // ================VALIDATE===============
    useEffect(() => {
        if(studentModal.firstname) {
            setMessageErr({...messageErr, firstname: ""})
        }
        if(studentModal.lastname) {
            setMessageErr({...messageErr, lastname: ""})
        }
        if(studentModal.age) {
            setMessageErr({...messageErr, age: validate(studentModal.age)})
        }
        if(studentModal.classStudent) {
            setMessageErr({...messageErr, classStudent: ""})
        }
    }, [studentModal]);

    const handleChangePage = (page: number) => {
        setPageNumber(page)
    }

    useEffect(() => {
        getStudents()
    }, [pageNumber])

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
                    setMessageErr={setMessageErr}
                    setIdStudentUpdate={setIdStudentUpdate}
                    setIsOpenModal={setIsOpenModal}
                    setCheckUpdate={setCheckUpdate}
                >
                    <StudentForm
                        refCurrent={ref}
                        messageErr={messageErr}
                        handleChangeFile={handleChangeFile}
                        checkUpdate={checkUpdate}
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
                    handleDelete={handleDelete}
                />
                <div className="flex justify-center mt-10">
                    <Pagination total={totalPage} onChange={(page: number) => handleChangePage(page)}/>
                </div>
            </div>
        </div>
    )
}

export default StudentPage;
