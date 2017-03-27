import mongoose, { Schema } from 'mongoose';

// Define our token schema
const CodeSchema = new mongoose.Schema({
    value: { type: String, required: true },
    redirectUri: { type: String, required: true },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    }
});

// Export the Mongoose model
export default mongoose.model('Code', CodeSchema);