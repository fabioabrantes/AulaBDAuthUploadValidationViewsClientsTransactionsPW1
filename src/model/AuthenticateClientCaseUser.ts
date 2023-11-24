import { compare } from 'bcrypt';
import {prisma} from '../database/repositoryClient';
import {sign} from 'jsonwebtoken';

type Params = {
  username:string;
  password:string;
}
export class AuthenticateClientCaseUser{

  async execute({password,username}:Params){

      //validar com campos

      // verifica se o client existe
      const clientExist = await prisma.client.findUnique({
        where:{
          username
        }
      })  ;
      if(!clientExist) {
        return {message: "cliente not exist"}
      }

      const verifyPassword = await compare(password,clientExist.password);

      if(!verifyPassword){
        return {message: "passwor ou username invalid"}

      }
      const {name} = clientExist;
      const token = sign(
        {name},
        process.env.KEY_SECRET as string, 
        {expiresIn:'1d',subject:clientExist.id}
        );
        
        return token;
  }
}