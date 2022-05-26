import Input from "../../../components/Shared/Form/Input";
import React from "react";
import {StudentDocument} from "../../../models/Student";
import {ErrorDocument} from "../../../models/Error";

interface Props {
    refCurrent: any;
    setMessageErr: any;
    messageErr: ErrorDocument;
    checkUpdate: boolean;
    handleChangeFile: any;
    studentModal: StudentDocument;
    setStudentModal: any;
    handleCreateStudent: any;
    handleUpdateStudent: any;
}
const StudentForm: React.FC<Props> = (props) => {
    const {
        refCurrent,
        setMessageErr,
        messageErr,
        handleChangeFile,
        studentModal,
        checkUpdate,
        setStudentModal,
        handleCreateStudent,
        handleUpdateStudent} = props

    return(
        <div className="modal relative w-full z-[2]">
            <div className="modal-title mt-5">
                <h2 className="text-center text-white text-2xl font-bold">
                    { checkUpdate ? "Update Student" : "Create Student" }
                </h2>
            </div>
            <div className="form-data relative flex justify-center">
                <form className="w-[50%] form overflow-y-auto overflow-x-hidden py-10 px-5 bg-white rounded-2xl">
                    <div className="grid xl:grid-cols-2 xl:gap-6">
                        {/*firstname*/}
                        <Input
                            label={"firstname"}
                            type={"text"}
                            setMessageErr={setMessageErr}
                            obErr={messageErr}
                            messageErr={messageErr.firstname}
                            content={studentModal.firstname}
                            onChange={(text) => {
                                setStudentModal({...studentModal, firstname: text})
                            }}
                        />
                        {/*lastname*/}
                        <Input
                            label={"lastname"}
                            type={"string"}
                            setMessageErr={setMessageErr}
                            obErr={messageErr}
                            messageErr={messageErr.lastname}
                            content={studentModal.lastname}
                            onChange={(text) => {
                                setStudentModal({...studentModal, lastname: text})
                            }}
                        />
                    </div>
                    {/*age*/}
                    <Input
                        label={"age"}
                        type={"number"}
                        setMessageErr={setMessageErr}
                        obErr={messageErr}
                        messageErr={messageErr.age}
                        content={studentModal.age}
                        onChange={(text) => {
                            setStudentModal({...studentModal, age: text})
                        }}
                    />
                    {/*class*/}
                    <Input
                        label={"classStudent"}
                        type={"text"}
                        setMessageErr={setMessageErr}
                        obErr={messageErr}
                        messageErr={messageErr.classStudent}
                        content={studentModal.classStudent}
                        onChange={(text) => {
                            setStudentModal({...studentModal, classStudent: text})
                        }}
                    />
                    <div className="relative z-0 w-full h-[60px] mb-6 group">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                               htmlFor="student_avatar">Upload file</label>
                        <input
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            aria-describedby="student_avatar_help"
                            name="student_pic"
                            ref={refCurrent}
                            id="student_avatar"
                            onChange={handleChangeFile}
                            required={true}
                            type="file" />
                        {
                            messageErr.student_pic ? <span className="text-[0.6rem] text-red-600 italic">Student_pic is required!</span> : null
                        }
                    </div>
                    <button type="submit"
                            onClick={checkUpdate ? handleUpdateStudent : handleCreateStudent}
                            className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        {checkUpdate ? "Update" : "Create"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default StudentForm
