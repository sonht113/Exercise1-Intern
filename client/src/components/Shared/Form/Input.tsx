import React, {useState} from "react";
import {ErrorDocument} from "../../../models/Error";

interface inputProps {
    label: string;
    type: string;
    content: string;
    setMessageErr: any;
    obErr: ErrorDocument;
    messageErr: string;
    onChange: (text: string) => void;
}

const Input: React.FC<inputProps> = (props, ref: any) => {
    const {onChange, content, label, setMessageErr, obErr, messageErr, type} = props;

    return(
        <div className="relative z-0 w-full h-[60px] mb-6 group">
            <input type={type} name="firstname" id="floating_first_name"
                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                   value={content || ''}
                   onKeyDown={(evt) => {
                       label === "age"
                           ? (["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault())
                           : (null)
                       }
                   }
                   onChange={(e) => {
                       onChange(e.target.value)
                       setMessageErr({...obErr, [label]: ""})
                   }}
            />
            <label htmlFor="floating_first_name"
                   className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {label}</label>
            {
                messageErr ? <span className="text-[0.6rem] text-red-600 italic">{`${messageErr}!`}</span> : null
            }
        </div>
    )
}

// @ts-ignore
export default Input
