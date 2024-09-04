
export type TUserLogin={
    email:string;
    password:string;
}


export type TUserTokenPayload = {
    id:string;
    name: string;
    email: string;
    role: 'user' | 'admin'; 
    iat: number; 
    exp: number; 
  };
  
