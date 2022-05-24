import React from "react";

import {IoCloseCircleSharp} from "react-icons/io5";
import Input from "../Shared/Form/Input";
import {StudentDocument} from "../../models/Student";


interface modalProp {
    isOpenModal: boolean;
    setIsOpenModal: any;
    setError: any;
    children: any;
};


const Modal: React.FC<modalProp> = (props) => {
    const {
        isOpenModal,
        setIsOpenModal,
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
                    setError("")
            }}></a>
            <button className="close-modal absolute top-3 right-5 z-[5]" onClick={() => {
                setIsOpenModal(false)
                setError("")
            }}>
                <IoCloseCircleSharp className="text-5xl fill-white" />
            </button>
            {props.children}
        </div>
    )
}
export default Modal;
