import Express from 'express';

import { Repository } from './../controllers';
import Policies, { AuthPolicy } from './../policies';

const Router = Express.Router();

Router.route('/')
    .post(AuthPolicy.requireLogin, Repository.create)
    .delete(AuthPolicy.requireLogin, Repository.removeList)
    .get(Repository.list);

Router.route('/:repositoryCode')
    .put(AuthPolicy.requireLogin, Repository.update)
    .get(Repository.read);

Router.param('repositoryCode', Repository.getByCode);

export default Router;