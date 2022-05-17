import {createSelector} from "@reduxjs/toolkit";

const selectorStudents = (state: any) => {
    return state.students
}

export const selectRemainingStudents = createSelector(
    selectorStudents,
    (students) => {
        return students.students
    }
)