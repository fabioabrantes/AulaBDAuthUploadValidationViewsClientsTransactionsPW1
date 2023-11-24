import path from "node:path";
import express from 'express';
import cors from 'cors';

import { routes } from './routes';


const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use('/uploadsAssociation', express.static(path.resolve(__dirname, '..', 'tmp','imageAssociation')));
app.use('/uploadsUser', express.static(path.resolve(__dirname, '..', 'tmp','imageUser')));


app.listen(3333, ()=>{console.log("server online on port 3333");});