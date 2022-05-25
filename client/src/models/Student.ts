export type StudentDocument = Student | { [key: string]: any }

export interface Student {
    _id?: string;
    firstname: string;
    lastname: string;
    age: string;
    classStudent: string;
    avatar: string;
}

export interface StudentPost {
    firstname: string;
    lastname: string;
    age: string;
    classStudent: string;
    avatar: {} | null;
}
