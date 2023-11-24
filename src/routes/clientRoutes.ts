import {Router} from 'express';

import multer  from 'multer';
import uploadConfig from '../config/upload';

//middleware
import {verifyAuthorization} from '../middlewares/verifyAuthorization';

//controllers
import {RegisterClientController} from '../controllers/RegisterClientController';
import { DeleteClientController } from '../controllers/DeleteClientController';
import { FindAllClientsController } from '../controllers/FindAllClientsController';
import { AuthenticateClientController } from '../controllers/AuthenticateClientController';
import {UpdateUserImageController} from '../controllers/UpdateUserImageController';
import {ListDetailClientController} from '../controllers/ListDetailClientController';


const routesClients = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/imageUser"))
const updateUserImageController = new UpdateUserImageController();
routesClients.patch('/imageClient',verifyAuthorization,uploadAvatar.single("file"), updateUserImageController.handle);


const authenticateClientController = new AuthenticateClientController();
routesClients.post('/client/session',authenticateClientController.handle);

const registerClientController = new RegisterClientController();
routesClients.post('/clientsAccount',registerClientController.handle);

const findAllClientsController = new FindAllClientsController();
routesClients.get('/account/alls', findAllClientsController.handle);

const deleteClientController = new DeleteClientController();
routesClients.delete('/clientsAccount',verifyAuthorization, deleteClientController.handle);

const listDetailClientController = new ListDetailClientController();
routesClients.get('/client/detail',verifyAuthorization, listDetailClientController.handle);

export {routesClients}