import Express from 'express';
import { Auth } from './../controllers';

const Router = Express.Router();

Router.post('/login', Auth.login);
Router.post('/register', Auth.register);

Router.get('/me', Auth.me);

export default Router;