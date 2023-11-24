import Transaction from "./Transaction";

export default interface Client{
  id?: string;
  cpf: string;
  name: string;
  username: string;
  password:string;
  latitude: number;
  longitude: number;
  transactions?: Transaction[];
  associationId: string;
}