export interface Student {
    id?: string;
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