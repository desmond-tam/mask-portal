export interface IUser {
    userId:string;
    identifier:string;
    name:string;
    position:string;
}

export class User implements IUser {
    userId='';
    identifier='';
    name='';
    position='';
 }


 export interface ILoginUser {
    name:string;
    idToken:string;
    preferred_username:string;
 }

 export class LoginUser implements ILoginUser {
    name='';
    idToken='';
    preferred_username='';
 }

 
 export interface IAuthication {
   Login:() => void;
   Logout:() => void;
   IsAuthenicated:() => boolean;
   GetToken:() => string;
 }

 