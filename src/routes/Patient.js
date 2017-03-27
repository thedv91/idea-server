import Express from 'express';

import { Patient } from './../controllers';
import Policies, { PatientPolicy, AuthPolicy } from './../policies';

const Router = Express.Router();

Router.route('/')
    .get(AuthPolicy.requireLogin, Patient.list)
    .post(AuthPolicy.requireLogin, Patient.create);

Router.route('/:patientId(\\d+)/')
    .get(AuthPolicy.requireLogin, Patient.read)
    .put(AuthPolicy.requireLogin, Patient.update)
    .delete(AuthPolicy.requireLogin, Patient.remove);


Router.param('patientId', Patient.getPatientByID);

export default Router;