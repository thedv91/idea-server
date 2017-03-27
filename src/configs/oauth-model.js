export const OauthModel = {
    // We support generators.
    getAccessToken: function* () {
        // yield somethingAsync();

        return 'works!'
    },

    // Or, async/await (using _babel_).
    getAuthorizationCode: async function () {
        // await somethingAsync();

        return 'works';
    },

    // Or, calling a node-style callback.
    getClient: function (done) {
        if (false) {
            return done(new Error());
        }

        done(null, 'works!');
    },

    // Or, returning a promise.
    getUser: function () {
        return new Promise('works!');
    },
};