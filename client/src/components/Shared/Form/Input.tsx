import React, {useState} from "react";
import {validate} from "../../../validation/studentValidation";

interface inputProps {
    label: string;
    type: string;
    content: string;
    onChange: (text: string) => void;
}

const Input: React.FC<inputProps> = (props, ref: any) => {
    const {onChange, content, label, type} = props;
    const [validation, setValidation] = useState<string>("")

    const handleBlur = () => {
        setValidation(validate(label, content))
    }

    return(
        <div className="relative z-0 w-full h-[60px] mb-6 group">
            <input type={type} name="firstname" id="floating_first_name"
                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                   value={content || ''}
                   onBlur={handleBlur}
                   onChange={(e) => {
                       onChange(e.target.value)
                       setValidation(validate(label, content))
                   }}
            />
            <label htmlFor="floating_first_name"
                   className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {label}</label>
            {
                validation !== "" ? <span className="text-[0.6rem] text-red-600 italic">{validation}</span> : null
            }
        </div>
    )
}

// @ts-ignore
export default Input
