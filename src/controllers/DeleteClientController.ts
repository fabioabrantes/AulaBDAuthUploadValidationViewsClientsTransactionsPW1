import {Request,Response} from 'express';
import {DeleteClientCaseUse} from '../model/DeleteClientCaseUse';

export class DeleteClientController {


  async handle(req:Request,res:Response):Promise<Response>{
    const id = req.id_client;

    const deleteClientCaseUse = new DeleteClientCaseUse();
    await deleteClientCaseUse.execute({id});
    
    return res.status(200).json({message:"cliente removido"})

  }
}