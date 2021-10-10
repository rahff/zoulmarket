import { ResponseAuth } from "src/app/shared/models/responseServer.model";
import { NewUser, User, UserLog } from "src/app/shared/models/user.model";

export const fakeBody:NewUser = {
    adress: "24 rue du pont",
    city: "Paris",
    email: "email123@gmai.com",
    firstname: "Henry",
    name: "Gerard",
    password: "123123",
    poste: 75000,
    tel: "0722121410"

  }
  export const fakeAuth: ResponseAuth = {
    jwt: "hrhfuhtfrjfrjfihjrhf9898",
    user: {
          name: "jean",
          email: "jeanpoli@free.fr"                    
    }
  }
  export const fakeResponseError = {
    message: "error",
    status: 403
  }
  export const URL_API_LOGIN = "http://localhost:1337/auth/local";
  export const URL_API_REGISTER = "http://localhost:1337/auth/local/register";
  export const bodyFake: UserLog = {
    identifier : "emailUser@free.fr",
    password: "1254125"
  }
  export  const URL_API_USER = "http://localhost:1337/users/r45545r5r454";
  export const userInfos: User = {
      name: "jean",
      adress: {
        street: "rue du pont",
        city: 'Paris',
        postal: 75000,
        numero:'12'
      },
      confirmed: true,
      email: "jeanjean@gmail.com",
      firstname: "Didier",
      id: 'r45545r5r454',
      role: "public",
      tel: "0125458789"
  }

//   name: string;
//     firstname: string;
//     email: string;
//     tel: string;
//     adress: string,
//     poste: number;
//     city: string;
//     id: string;
//     confirmed: boolean,
//     role: any