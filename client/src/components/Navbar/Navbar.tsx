import React from "react";

import {MdManageAccounts, MdOutlineAccountCircle} from 'react-icons/md'
import {TiMessages} from 'react-icons/ti'
import {VscFeedback} from 'react-icons/vsc'
import logo from '../../assets/images/Logo_ncc.png'
import {Link} from "react-router-dom";

const Navbar:React.FC = () => {
    return(
        <div className="Navbar w-[300px] z-10">
            <div className="navbar-logo flex justify-center pt-5">
                <img className="w-[150px] object-cover" src={logo} alt="logo"/>
            </div>
            <div className="nav-menu mt-10 pl-7">
                <p className="title text-xs text-gray-500">Dashboard</p>
                <ul className="menu mt-3">
                    <Link to="/">
                        <li className="flex items-center text-sm px-3 py-1 mr-5 mb-5 cursor-pointer rounded-2xl hover:bg-amber-400 duration-150">
                            <MdManageAccounts className="text-xl mr-2" />
                            Students Manage
                        </li>
                    </Link>
                    <li className="flex items-center text-sm px-3 py-1 mr-5 mb-5 cursor-pointer rounded-2xl hover:bg-amber-400 duration-150">
                        <MdOutlineAccountCircle className="text-xl mr-2" />
                        Accounts Manage
                    </li>
                </ul>

                <p className="title text-xs text-gray-500">Notifications</p>
                <ul className="menu mt-3">
                    <li className="flex items-center text-sm px-3 py-1 mr-5 mb-5 cursor-pointer rounded-2xl hover:bg-amber-400 duration-150">
                        <VscFeedback className="text-xl mr-2" />
                        Feedback
                    </li>
                    <li className="flex items-center text-sm px-3 py-1 mr-5 mb-5 cursor-pointer rounded-2xl hover:bg-amber-400 duration-150">
                        <TiMessages className="text-xl mr-2" />
                        Messages
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar