import {prisma} from '../database/repositoryClient';
import { deleteFile } from '../utils/file';

interface IRequest{
  id:string;
  nameImage:string;
}
export class UpdateUserImageUseCase{

  async execute({id,nameImage}: IRequest):Promise<void>{
   const user = await prisma.client.findUnique({
    where:{
      id,
    }
   })

   await deleteFile(`./tmp/imageUsers/${user?.imagename}`)
   
    await prisma.client.update({
      data:{
        imagename:nameImage
      },
      where:{
        id
      }
    });

  }
}