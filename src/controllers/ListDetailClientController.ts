import {Request,Response} from 'express';
import {ListDetailClientUseCase} from '../model/ListDetailClientUseCase';
import clientView from '../views/client_view';

export class ListDetailClientController {


  async handle(req:Request,res:Response):Promise<Response>{
    const id = req.id_client;

    const listDetailClientUseCase = new ListDetailClientUseCase();
    const client = await listDetailClientUseCase.execute({id});
    
    if(client){
      return res.status(200).json(clientView.renderClient(client));
    }else{
      return res.status(400).json({message:'client not exists'});
    }

  }
}