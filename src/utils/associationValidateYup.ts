import * as Yup from 'yup';
import { ValidationError } from 'yup';
import {AssociationDTO} from "../model/entities/Association";
import {Request,Response,NextFunction } from 'express';


export async function associationValidateYup(association:AssociationDTO){
  // Fazendo o schema
  const schema = Yup.object().shape({
    name: Yup.string().required('Error:nome deve ser obrigatório'),
    latitude: Yup.number()
            .required('Error:latitude deve ser obrigatório'),
    longitude: Yup.number().required('Error:longitude deve ser obrigatório'),
    images: Yup.array(
      Yup.object().shape({
        path: Yup.string().required('Error:ima🥗  deve ser obrigatório'),
      })
    ),
  });
 
  try {
    //validando com o validate do schema
    await schema.validate(association,{ abortEarly: false,});// aqui tras todas as mensagens onde teve errors
    
  } catch (error) {
    if(error instanceof ValidationError){
      return error
    }
  }

}