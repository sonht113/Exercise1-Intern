import React, {useEffect, useState} from "react";
import {MdOutlineDeleteOutline, MdOutlineAccountCircle} from 'react-icons/md';
import {FaPlus} from 'react-icons/fa';
import {useAppDispatch, useAppSelector} from "../app/hook";
import Lottie from 'lottie-react'
import {BiEdit} from 'react-icons/bi';
import {IoCloseCircleSharp} from 'react-icons/io5'

import Header from "../components/Header/Header";
import AnimatedPage from "../animation/AnimatedPage";
import studentApi from "../api/studentApi";
import {studentSlice} from "../slice/studentSlice";
import {selectRemainingStudents} from "../app/selector";
import {Student, StudentDocument} from "../models/Student";
import emptyStudent from "../lottefiles/student-empty.json";
import Modal from "../components/Modal/Modal";
import ConfirmModal from "../components/ConfirmModal/ConfirmModal";


const StudentPage: React.FC = () => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false)
    const [checkStudent, setCheckStudent] = useState<boolean>(false)
    const [create, setCreate] = useState<boolean>(false)
    // @ts-ignore
    const [studentModal, setStudentModal] = useState<StudentDocument>({})
    // @ts-ignore
    const [studentDelete, setStudentDelete] = useState<StudentDocument>({})
    const dispatch = useAppDispatch()

    const listStudent = useAppSelector(selectRemainingStudents).students

    // GET STUDENTS
    useEffect(() => {
        studentApi
            .getAll()
            .then((res) => {
                dispatch(studentSlice.actions.setStudents(res))
            })
            .catch((err: Error) => console.log(err))
        window.scroll( 0, 0);
    }, [])

    if(checkStudent) {
        studentApi
            .getAll()
            .then((res) => {
                dispatch(studentSlice.actions.setStudents(res))
                setCheckStudent(false)
            })
            .catch((err: Error) => console.log(err))
        window.scroll( 0, 0);
    }

    const handleEdit = (student: Student) => {
        setStudentModal(student)
        setIsOpenModal(true)
    }

    const handleDelete = (student: Student) => {
        setIsOpenConfirmModal(true)
        setStudentDelete(student)
    }

    return(
        <div>
            <Header />

            <div className="relative h-[100vh] bg-[#F0F0F0]" >
                <div
                    className="absolute top-3 right-3 flex justify-center items-center w-[40px] h-[40px] rounded-full cursor-pointer z-20 bg-green-600 hover:scale-125 duration-150"
                    onClick={() => {
                        setCreate(true)
                        setStudentModal({} as StudentDocument)
                        setIsOpenModal(true)
                    }}
                >
                    <FaPlus className="text-md fill-white" />
                </div>
                {/*Modal*/}
                <Modal
                    isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                    setCheckStudent={setCheckStudent}
                    studentModal={studentModal}/>

                {/*Confirm Modal*/}
                {
                    isOpenConfirmModal
                        ? <ConfirmModal
                            setIsOpen={setIsOpenConfirmModal}
                            isOpen={isOpenConfirmModal}
                            setCheckDeleteStudent={setCheckStudent}
                            setStudentDelete={setStudentDelete}
                            student={studentDelete}/>
                        : null
                }

                {/*Data*/}
                <div className="pt-5 w-[97%] z-0">
                    <div className="ColumnData flex mt-1 mx-10 px-10 py-2">
                        <div className="img-product mr-5">
                            {/*<img className="w-[50px] h-[45px] rounded-full object-cover" src={img} alt="title" />*/}
                            <MdOutlineAccountCircle className="text-[3em]" />
                        </div>
                        <div className="list-data grid grid-cols-12 gap-x-2 bg-white rounded-full w-full px-1 items-center justify-around shadow-xl">
                            <p className="col-span-3 text-gray-500 text-center font-semibold text-sm border-r-2 border-r-gray-400 pr-5 pl-2">Name</p>
                            <p className="col-span-3 text-gray-500 text-center font-semibold text-sm border-r-2 border-r-gray-400 pr-5">Age</p>
                            <p className="col-span-3 text-gray-500 text-center font-semibold text-sm border-r-2 border-r-gray-400 pr-5">Class</p>
                            <p className="col-span-3 text-gray-500 text-center font-semibold text-sm ">Edit</p>
                        </div>
                    </div>
                </div>
                <div className="h-[2px] w-[85%] mt-3 mx-auto bg-gray-500 z-0"></div>
                {/*List Student*/}
                <AnimatedPage>
                    {
                        listStudent?.length === 0
                            ? (
                                <div className="empty-student flex justify-center">
                                    <div>
                                        <Lottie
                                            className="w-[200px] duration-150"
                                            animationData={emptyStudent}
                                            loop={true}
                                            autoplay={true}/>
                                        <p className="text-sm text-center text-gray-500">Not have any Student!</p>
                                    </div>
                                </div>
                            )
                            : (
                                <div className={listStudent?.length >= 7 ? "pt-5 h-[60vh] w-[97%] overflow-y-scroll z-0" : "mt-10 w-[97%] overflow-y-scroll z-0"}>
                                    {
                                        listStudent?.map((student: Student, index: number) => (
                                            <div key={index} className="ColumnData flex mt-1 mb-5 mx-10 px-10">
                                                <div className="img-product mr-5">
                                                    <img className="w-[50px] h-[45px] object-cover rounded-full" src={`http://localhost:5000/${student.avatar}`} alt={student.firstname}/>
                                                </div>
                                                <div className="list-data grid grid-cols-12 gap-x-2 bg-white rounded-full w-full px-1 items-center justify-around shadow-xl">
                                                    <p className="col-span-3 text-gray-500 text-center text-sm border-r-2 border-r-gray-400 pr-5 pl-2">
                                                        {`${student.lastname + " " + student.firstname}`}
                                                    </p>
                                                    <p className="col-span-3 text-gray-500 text-center text-sm border-r-2 border-r-gray-400 pr-5">{student.age}</p>
                                                    <p className="col-span-3 text-gray-500 text-center text-sm border-r-2 border-r-gray-400 pr-5">{student.classStudent}</p>
                                                    <div className="col-span-3 edit flex justify-around items-center">
                                                        <BiEdit
                                                            className="text-xl fill-green-600 cursor-pointer hover:scale-125 duration-150"
                                                            onClick={() => {
                                                                handleEdit(student)
                                                            }}/>
                                                        <MdOutlineDeleteOutline
                                                            className="text-xl fill-red-600 cursor-pointer hover:scale-125 duration-150"
                                                            onClick={() => handleDelete(student)}/>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                    }
                </AnimatedPage>
            </div>
        </div>
    )
}

export default StudentPage;