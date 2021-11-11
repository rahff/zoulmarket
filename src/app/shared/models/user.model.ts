import { Purchase } from "./order.model";

export interface NewUser {
    name: string;
    firstname: string;
    email: string;
    tel: string;
    adresse:{
        postal: number;
        city: string;
        numero: string;
        rue: string;
        name: string;
        firstname: string;
    },
    confirmed: boolean;
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
    adresse:{
        postal: number;
        city: string;
        numero: string;
        rue: string;
        name: string;
        firstname: string;
    }
    id: string;
    confirmed: boolean,
    role: any,
    orders?: Purchase[]
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
export interface AuthUser{
    id: string;
    confirmationToken: string
}
export interface MailToUser{
    to: string;
    from: string;
    subject: string;
    url: string;
    name: string;
}
export interface Avis {
    title: string;
    rating: number;
    user: string;
    product: string;
    commentaire: string;
    username: string;
    createdAt?: Date
}