import Express, { Router } from 'express';
import { Upload } from './../controllers';
import { AuthPolicy } from './../policies';

const router = Router();

router.route('/')
    .post(AuthPolicy.requireLogin, Upload.upload);


export default router;