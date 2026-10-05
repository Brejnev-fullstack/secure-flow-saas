export interface Register{
  nomUser:string;
  prenom:string;
  tel?:string | null;
  email:string;
  login:string;
  password:string;
}
export interface Login {
  email: string;
  password: string;
}