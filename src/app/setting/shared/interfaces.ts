export interface Position {
    id:number;
    name:string;
}

export interface Reason {
    id:number;
    name:string;
}

export interface Role {
    id:number;
    name:string;
}

export interface User {
    username:string;
    password:string;
    fullname:string;
    position:number;
    roleuser:number;
}

export interface Predicate<T> {
    (item: T): boolean
}