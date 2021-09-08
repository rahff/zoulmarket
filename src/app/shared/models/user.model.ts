export interface NewUser {
    name: string;
    firstname: string;
    email: string;
    tel: string;
    adress: string,
    poste: number;
    city: string;
    password: string;
}
export interface UserLog {
    identifier: string;
    password: string;
}
export interface User{
    name: string;
    firstname: string;
    email: string;
    tel: string;
    adress: string,
    poste: number;
    city: string;
    id: string;
    confirmed: boolean,
    role: any
}