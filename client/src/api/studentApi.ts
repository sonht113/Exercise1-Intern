import {Student, StudentPost} from "../models/Student";
import axiosClient from "./axiosClient";
import {ListResponse} from "../models/Common";

const studentApi = {
    add: async (data: Student): Promise<Student> => {
        const url = '/students/add-student'
        return await axiosClient.post(url, data)
    },
    getAll: async (page: number, limit: number): Promise<ListResponse<Student>> => {
        const url = '/students/all-student'
        return await axiosClient.get(url, {
            params: {
                page: page,
                limit: limit
            }
        })
    },
    getDetail: async (id: string): Promise<Student> => {
        const url = `/student-detail/${id}`
        return await axiosClient.get(url)
    },
    update: async (id: string, data: Student): Promise<Student> => {
        const url = `/students/update-student/${id}`
        return await axiosClient.put(url, data)
    },
    delete: async (id: string | undefined): Promise<any> => {
        const url = `/students/delete-student/${id}`
        return await axiosClient.delete(url)
    }
}

export default studentApi
