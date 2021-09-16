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
    numero: string;
    street: string,
    postal: number;
    city: string;
    id: string;
    confirmed: boolean,
    role: any
}
export interface DataMenuProfilUser {
    title: string;
    logo: string;
    text: string;
    link: string
}
export interface BodyMail{
    name: string;
    firstname: string;
    tel: string;
    email: string;
    message: string
}