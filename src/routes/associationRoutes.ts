import {Router} from 'express';

import multer  from 'multer';
import uploadConfig from '../config/upload';

//middleware


//controllers
import {RegisterAssociationController} from '../controllers/RegisterAssociationController';


const routesAssociation = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/imageAssociation"))
const registerAssociationController = new RegisterAssociationController();
routesAssociation.post('/associationAccount',uploadAvatar.array("images"), registerAssociationController.handle);


export {routesAssociation}