import {Request, Response} from 'express';
import {RegisterAssociationUseCase} from '../model/RegisterAssociationUseCase';
import {AssociationDTO} from "../model/entities/Association";

export class RegisterAssociationController{

  async handle(request: Request, response: Response):Promise<Response>{
   
    const {
      name,
      latitude,
      longitude,
    } = request.body;
    
    // pegar os arquivos pelo files e transformar para o formato de array de file. Express.Multer.File[]
    //pq o multer vem com outro tipo de vetor. aqui forço que é um array de arquivos
    const imagesRequest = request.files as Express.Multer.File[];

    // passar somente o objeto conyendo o path das images para registrar na associação
    const imagesPath = imagesRequest.map((img) => ({path:img.filename}));

    const registerAssociationUseCase = new RegisterAssociationUseCase();

    const data = {
      name,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      images:imagesPath
    } as AssociationDTO;
    

    const association = await registerAssociationUseCase.execute(data);

    return response.status(201).json(association);
  }
}
