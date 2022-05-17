import React from "react";

import {IoMdNotificationsOutline} from 'react-icons/io'
import {IoSettingsOutline} from 'react-icons/io5'
import avatar from '../../assets/images/avatar.png'

const Header: React.FC = () => {
    return(
        <div className="Header py-2 bg-white flex justify-end items-center pr-3">
            <div className="notification cursor-pointer hover:scale-125 duration-150">
                <IoMdNotificationsOutline className="text-2xl" />
            </div>
            <div className="setting mx-3 cursor-pointer hover:scale-125 duration-150">
                <IoSettingsOutline className="text-2xl" />
            </div>
            <div className="avatar cursor-pointer">
                <img className="w-[40px] h-[40px] object-cover rounded-full" src={avatar} alt="avatar"/>
            </div>
        </div>
    )
}

export default Header