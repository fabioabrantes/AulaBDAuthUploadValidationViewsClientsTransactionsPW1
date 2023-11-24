import {Request, Response} from 'express';
import {UpdateUserImageUseCase} from '../model/UpdateUserImageUseCase';

export class UpdateUserImageController{

  async handle(request:Request, response:Response){
    const id =request.id_client;

    const nameImage = request.file!.filename;
    const updateUserImageUseCase = new UpdateUserImageUseCase();

    await updateUserImageUseCase.execute({id,nameImage});

    response.status(204).json({message:'imagem do perfil atualizada'})

  }
}