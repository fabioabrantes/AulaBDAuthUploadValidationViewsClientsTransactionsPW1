import {AssociationDTO} from "./entities/Association";
import {prisma} from '../database/repositoryClient';
import { associationValidateYup } from "../utils/associationValidateYup";

export class RegisterAssociationUseCase{
  async execute(data:AssociationDTO){
    const errorValidation = await associationValidateYup(data);
    if (errorValidation) {
      return {message:[...errorValidation.errors], statusCode: 400};
    }

    const {name,latitude,longitude,images} = data;
    const associationExists = await prisma.association.findFirst({  where:{name} });

    if (associationExists){
      return {message: "Error: Association exists", statusCode: 400};
    }
      
    const associationNew = await prisma.association.create({
      data:{  
        name, 
        latitude, 
        longitude, 
        images:{
          create:[...images]
        }
      },
    });
   
    return associationNew;

  }
}