import {Request,Response} from 'express';
import {AuthenticateClientCaseUser} from '../model/AuthenticateClientCaseUser';

export class AuthenticateClientController {


  async handle(req:Request,res:Response):Promise<Response>{
    const {username, password} = req.body;
    
    const authenticateClientCaseUser = new AuthenticateClientCaseUser();
    const token = await authenticateClientCaseUser.execute({username, password});
    
    return res.status(200).json(token);

  }
}