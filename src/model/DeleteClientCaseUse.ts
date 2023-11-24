import {prisma} from '../database/repositoryClient';

type Params = {
  id:string;
}
export class DeleteClientCaseUse{

  async execute({id}:Params):Promise<void>{

    await prisma.client.delete({
      where:{
        id
      }
    });
  }
}