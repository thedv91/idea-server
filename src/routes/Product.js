import Express from 'express';

import { Product } from './../controllers';
import Policies, { AuthPolicy } from './../policies';

const Router = Express.Router();

Router.route('/')
    .post(AuthPolicy.requireLogin, Product.create)
    .get(AuthPolicy.requireLogin, Product.list);

Router.route('/:productCode')
    .get(AuthPolicy.requireLogin, Product.read);

Router.param('productCode', Product.getProductByCode);

export default Router;