import Express from 'express';

import * as Client from './../controllers/Client';
import Policies, { PatientPolicy, AuthPolicy } from './../policies';

const Router = Express.Router();

Router.route('/')
    .post(AuthPolicy.requireLogin, Client.postClients)
    .get(AuthPolicy.requireLogin, Client.getClients);


export default Router;