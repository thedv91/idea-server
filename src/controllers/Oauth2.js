import oauth2orize from 'oauth2orize';
import { Client, Code } from './../models';

const server = oauth2orize.createServer();

// Register serialialization function
server.serializeClient((client, callback) => {
    return callback(null, client._id);
});

// Register deserialization function
server.deserializeClient((id, callback) => {
    Client.findOne({ _id: id }).then(client => {
        return callback(null, client);
    }, error => {
        return callback(error);
    });
});

// Register authorization code grant type
server.grant(oauth2orize.grant.code((client, redirectUri, user, ares, callback) => {
    // Create a new authorization code
    let code = new Code({
        value: uid(16),
        clientId: client._id,
        redirectUri: redirectUri,
        userId: user._id
    });

    // Save the auth code and check for errors
    code.save().then(response => {
        return callback(null, response.value);
    }, error => {
        return callback(error);
    });
}));