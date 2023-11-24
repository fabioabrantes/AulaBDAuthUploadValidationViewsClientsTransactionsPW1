import {Request,Response,NextFunction } from 'express';
import {verify} from 'jsonwebtoken';

interface IPayload{
  sub:string;
  exp: number;
  name:string;
}
export async function verifyAuthorization(req:Request, resp:Response,next:NextFunction,){
  const headerAuth = req.headers.authorization;

    if(!headerAuth){
      return resp.status(403).json({message:'token missing'})
    }
    
    const [bearer, token] = headerAuth.split(' ');
    
    try {
      var {name,sub} = verify(token,process.env.KEY_SECRET as string) as IPayload;
      req.id_client = sub;
    } catch(err) {
      return resp.status(403).json({message:'token invalid'})
    }
    next();
}