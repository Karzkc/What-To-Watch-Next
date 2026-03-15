export interface userInfo{
    name?:string,
    email?:string,
    password?:string,
    isGuest:boolean,
    role : 'guest'|'user'
}