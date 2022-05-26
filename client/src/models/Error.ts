
export type ErrorDocument  = Error | { [key: string]: any}

export interface Error {
    firstname: string;
    lastname: string;
    age: string;
    classStudent: string;
    student_pic: string;
}
