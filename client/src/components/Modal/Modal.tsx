import React from "react";

import {IoCloseCircleSharp} from "react-icons/io5";


interface modalProp {
    isOpenModal: boolean;
    setIsOpenModal: any;
    setCheckUpdate: any;
    setIdStudentUpdate: any;
    setMessageErr: any;
    setError: any;
    children: any;
};


const Modal: React.FC<modalProp> = (props) => {
    const {
        isOpenModal,
        setIsOpenModal,
        setIdStudentUpdate,
        setMessageErr,
        setCheckUpdate,
        setError} = props

    return(
        <div className={
            isOpenModal
                ? "fixed w-full min-h-screen top-0 left-0 z-30 flex items-start justify-center transition"
                : "fixed w-full min-h-screen top-0 left-0 z-[1000] flex items-start justify-center invisible opacity-0 scale-50 transition"}
        >
            <a className="w-full min-h-screen top-0 left-0 absolute bg-black opacity-80 z-[1] duration-200 transform delay-600"
                onClick={() => {
                    setIsOpenModal(false)
                    setCheckUpdate(false)
                    setIdStudentUpdate("")
                    setError(null)
                    setMessageErr({})
            }}></a>
            <button className="close-modal absolute top-3 right-5 z-[5]" onClick={() => {
                setIsOpenModal(false)
                setError(null)
                setMessageErr({})
                setCheckUpdate(false)
                setIdStudentUpdate("")
            }}>
                <IoCloseCircleSharp className="text-5xl fill-white" />
            </button>
            {props.children}
        </div>
    )
}
export default Modal;
