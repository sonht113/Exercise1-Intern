import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ListResponse} from "../models/Common";
import {Student} from "../models/Student";

const initialState: Object = {}

export const studentSlice = createSlice({
    name: "students",
    initialState: {
        students: initialState
    },
    reducers: {
        setStudents: (state, action: PayloadAction<ListResponse<Student>>) => {
            state.students = action.payload
        }
    }
})