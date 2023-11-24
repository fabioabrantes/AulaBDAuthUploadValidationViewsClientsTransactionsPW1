import {Router} from 'express';

//middleware
import {verifyAuthorization} from '../middlewares/verifyAuthorization';

import { RegisterTransactionController } from './../controllers/RegisterTransactionController';
import { FindAllTransactionsByClientController } from '../controllers/FindAllTransactionsByClientController';
import { BalanceByClientController } from '../controllers/BalanceByClientController';


 const routesTransactions = Router();


const registerTransactionController = new RegisterTransactionController();
routesTransactions.post('/transactions',verifyAuthorization,registerTransactionController.handle);

const findAllTransactionsByClientController = new FindAllTransactionsByClientController();
routesTransactions.get('/transactions',verifyAuthorization, findAllTransactionsByClientController.handle);

const balanceByClientController = new BalanceByClientController();
routesTransactions.get('/balance',verifyAuthorization,balanceByClientController.handle);

export {routesTransactions}