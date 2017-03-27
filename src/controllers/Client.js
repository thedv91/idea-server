import _ from 'lodash';

import { Client } from './../models';
import { getErrorMessage, generateErrors } from './Error';

export function postClients(req, res) {
    // Create a new instance of the Client model
    const client = new Client(req.body);

    // Set the client properties that came from the POST data
    // client.name = req.body.name;
    // client.id = req.body.id;
    // client.secret = req.body.secret;
    client.userId = req.user;

    // Save the client and check for errors
    client.save().then((response) => {
        if (response)
            res.json({ message: 'Client added to the locker!', data: response });
    }, error => {
        return res.send(err);
    });
}

export function getClients(req, res) {
    // Use the Client model to find all clients
    Client.findOne({ userId: req.user }).then(client => {
        res.json(client);
    }, error => {
        res.send(error);
    });
}