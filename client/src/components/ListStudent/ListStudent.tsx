import React from "react";
import Lottie from "lottie-react";

import emptyStudent from "../../lottefiles/student-empty.json";
import {Student} from "../../models/Student";
import {BiEdit} from "react-icons/bi";
import {MdOutlineAccountCircle, MdOutlineDeleteOutline} from "react-icons/md";


interface IProps {
    listStudent: Student[];
    handleEdit: any;
    handleDelete: any;
}

const ListStudent: React.FC<IProps> = (props) => {
    const { listStudent, handleEdit, handleDelete } = props;

    return(
        <>
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
                                            <img className="w-[50px] h-[45px] object-cover rounded-full"
                                                 src={`http://localhost:5000/${student.avatar}`}
                                                 alt={student.firstname}/>
                                        </div>
                                        <div className="list-data grid grid-cols-12 gap-x-2 bg-white rounded-full w-full px-1 items-center justify-around shadow-xl">
                                            <p className="col-span-3 text-gray-500 text-center text-sm border-r-2 border-r-gray-400 pr-5 pl-2">
                                                {`${student.lastname + " " + student.firstname}`}
                                            </p>
                                            <p className="col-span-3 text-gray-500 text-center text-sm border-r-2 border-r-gray-400 pr-5">
                                                {student.age}
                                            </p>
                                            <p className="col-span-3 text-gray-500 text-center text-sm border-r-2 border-r-gray-400 pr-5">
                                                {student.classStudent}
                                            </p>
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
        </>
    )
}

export default ListStudent;
