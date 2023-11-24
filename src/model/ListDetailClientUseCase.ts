import {prisma} from '../database/repositoryClient';

import Client from './entities/Client';

interface ClientDTO extends Client{
  imagename: string | null;
}
interface Params{
  id:string;
}
export class ListDetailClientUseCase{
  
  async execute({id}: Params):Promise<ClientDTO | null>{

    const client = await prisma.client.findUnique({
      where:{
        id
      }
    });
    
    return client;
  }
}