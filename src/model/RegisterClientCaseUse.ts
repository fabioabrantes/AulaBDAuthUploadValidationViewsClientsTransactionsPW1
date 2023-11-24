import {prisma} from '../database/repositoryClient';
import {hash} from 'bcrypt';

import Client from './entities/Client';

import { clientValidateZod } from '../utils/clientValidateZod';

type ClientDTO = Client & {
  associationId:string;
}
export class RegisterClientCaseUse{

  async execute(dataBody:ClientDTO){
    //validação dos campos
    const result = clientValidateZod(dataBody);
    if (!result.success) {
      const formattedError =result.error.format();
      return {message:[...formattedError._errors], statusCode:400};
    }

    // verificar se o client já está cadastrado
    const client = await prisma.client.findUnique({
      where:{
        cpf:dataBody.cpf
      }
    })
    
    if(client !== null){
      return {message:'client já existe',statusCode:400}
    }

    const passwordCrypted = await hash(dataBody.password,5);

    const {cpf,name,latitude,longitude,username,associationId} = dataBody;

    const ClientNew = await prisma.client.create({
      data:{
       cpf,
       name,
       latitude,
       longitude,
       password:passwordCrypted, 
       username,
       transactions:{
         create:{
           type:'credits',
           amount:100
         }
       },
      associationId
      },
      include:{
        transactions:true,
      }
   
     });
   
     return ClientNew
  }
}