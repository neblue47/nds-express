export interface UserView {
    id:string;
    username: string;
    login:string;
    senha:string;
    nomeCompleto:string;
    fullName: string;
    password:string;
    repeatPassword:string;
    roleId:string;
    status:boolean;
    returnUrl: string;
    userType: number;
    userGroup: any;
    userGroupId: any;
    userGroupDescription:string;
    userTypeDescription: string;
    userFromAD: string;
    roleView:RoleView;
    domain:string;
    firstLogin:boolean;
}
export interface UserViewConfirm {
    id:string;
    username: string;
    fullName: string;
    oldpassword:string;
    password:string;
    repeatPassword:string;     
    status:boolean; 
    firstLogin:boolean;
}
export interface RoleView{
    id:string;
    role:string;
    name:string;
    description:string;
    
}  

export interface UserADView {
    id:string;
    name: string;
    mail: string;
    givenname:string;
    surname:string;
    userPrincipalName:string; 
    distinguishedName: string;
    roleView:RoleView;
    displayName:string;
}

export enum EUserGroup {
    Admin = 1,
    Gestor = 2,
    Vendedor = 3
  }