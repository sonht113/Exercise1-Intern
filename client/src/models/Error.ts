
export type ErrorDocument  = Error | { [key: string]: any}

interface Error {
    error: {
        firstname: any;
        lastname: any;
        age: {
            kind: string;
            message: string;
            name: string;
            path: string;
            properties: {};
        };
        classStudent: {
            kind: string;
            message: string;
            name: string;
            path: string;
            properties: {};
        };
        avatar: {
            kind: string;
            message: string;
            name: string;
            path: string;
            properties: {};
        };
    },
    title: string;
}
