import Express from 'express';

import { Product } from './../controllers';
import Policies, { AuthPolicy } from './../policies';

const Router = Express.Router();

Router.route('/')
    .post(AuthPolicy.requireLogin, Product.create)
    .delete(AuthPolicy.requireLogin, Product.removeList)
    .get(Product.list);

Router.route('/:productCode')
    .put(AuthPolicy.requireLogin, Product.update)
    .get(Product.read);

Router.param('productCode', Product.getProductByCode);

export default Router;