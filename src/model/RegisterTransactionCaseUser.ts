import {prisma} from '../database/repositoryClient';

import Transaction from './entities/Transaction';

type Params ={
  amount:number;
  type:string;
  id:string;
}

export class RegisterTransactionCaseUser{

  async execute({amount,type,id}:Params):Promise<Transaction>{
    //validação dos campos
    
    // verificar se o client já está cadastrado
    const transaction = await prisma.transaction.create({
      data: {
       amount,
       type,
       clientId:id
      },
      include:{
        client:true,
      }
    });
  
   
     return transaction;
  }
}