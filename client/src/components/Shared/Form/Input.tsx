import React, {forwardRef, memo, useState} from "react";
import {StudentDocument} from "../../../models/Student";


interface inputProps {
    label: string;
    type: string;
    content: string;
    onChange: (text: string) => void
}

const Input: React.FC<inputProps> = (props, ref: any) => {
    const {onChange, content, label, type} = props;
    const [validation, setValidation] = useState<string>("")

    const handleBlur = () => {
        if(content) {
            setValidation("")
        } else {
            setValidation(`The field ${label} is required!`)
        }
    }

    return(
        <div className="relative z-0 w-full mb-6 group">
            <input type={type} name="firstname" id="floating_first_name"
                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                   required={true} minLength={3}
                   value={content || ''}
                   onBlur={handleBlur}
                   onChange={(e) => {
                       onChange(e.target.value)
                       setValidation("")
                   }}
            />
            <label htmlFor="floating_first_name"
                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {label}</label>
            {
                validation !== "" ? <span className="text-xs text-red-600">{validation}</span> : null
            }
        </div>
    )
}

// @ts-ignore
export default Input
