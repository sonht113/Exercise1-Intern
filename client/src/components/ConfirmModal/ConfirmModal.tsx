import React, {useEffect, useState} from "react";
import studentApi from "../../api/studentApi";

interface confirmProp {
    setIsOpen: any;
    isOpen: boolean;
    setStudentDelete: any;
    setCheckDeleteStudent: any;
    student: {
        _id: string;
        firstname: string;
        lastname: string;
        age: string;
        classStudent: string;
    };
}
const ConfirmModal:React.FC<confirmProp> = (props) => {
    const {setIsOpen, isOpen, setStudentDelete, setCheckDeleteStudent, student} = props

    const [id, setId] = useState<string>('')
    const [firstname, setFirstName] = useState<string>('')
    const [lastname, setLastName] = useState<string>('')
    const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false)


    useEffect(() => {
        setId(student._id)
        setFirstName(student.firstname)
        setLastName(student.lastname)
    }, [student]);

    const handleCancel = () => {
        setIsOpen(false)
        setStudentDelete(null)
    }

    const handleDelete = (e: any) => {
        e.preventDefault()
        studentApi
            .delete(id)
            .then((res) => {
                setIsDeleteSuccess(true)
                setCheckDeleteStudent(true)
                setIsOpen(false)
            })
            .catch((err) => {
                console.log(err)
                setCheckDeleteStudent(false)
                setIsDeleteSuccess(false)
            })
    }

    return(
        <div className={
            isOpen
                ? "fixed w-full h-[100%] top-0 left-0 z-30 flex items-start justify-center transition"
                : "fixed w-full h-[100%] top-0 left-0 z-[1000] flex items-start justify-center invisible opacity-0 scale-50 transition"
        }>
            <a className="w-full h-[100%] top-0 left-0 absolute bg-black opacity-80 z-[1] duration-200 transform delay-600"></a>
            <div className="confirm-modal absolute top-[30%] w-[30%] bg-white py-5 px-5 z-[2]">
                <div className="confirm-modal__title">
                    <span className="text-sm">You want to delete: <span className="text-md font-bold text-green-600">{lastname + ' ' + firstname}</span>. </span>
                    <p className="text-sm text-red-600 font-bold">Are you sure?</p>
                </div>
                <div className="list-button flex justify-around items-center mt-5">
                    <button
                        className="bg-gray-400 text-white py-2 px-3 rounded-xl hover:scale-110 duration-150"
                        onClick={handleCancel}
                    >Cancel</button>
                    <button
                        className="bg-[#c61b1b] text-white py-2 px-3 rounded-xl hover:scale-110 duration-150"
                        onClick={handleDelete}
                    >Remove</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal;