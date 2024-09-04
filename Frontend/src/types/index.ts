
export type TUser = {
    id:string;
    name: string;
    email: string;
    role: 'user' | 'admin'; 
    iat: number; 
    exp: number; 
  };
  
export type TMeta={
    page:number;
    limit:number;
    total:number;
}
