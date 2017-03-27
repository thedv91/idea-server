import mongoose, { Schema } from 'mongoose';

const OauthTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    expriedAt: Date,
    userId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    clientId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    scopes: []
})

export default mongoose.model('OauthToken', OauthTokenSchema);