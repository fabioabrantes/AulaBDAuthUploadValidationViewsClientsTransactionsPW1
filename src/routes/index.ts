import {Router} from 'express';
import { routesClients } from './clientRoutes';
import { routesTransactions } from './transactionsRoutes';
import {routesAssociation} from './associationRoutes';

const routes = Router();

routes.use(routesClients);
routes.use(routesTransactions);
routes.use(routesAssociation);

export {routes};