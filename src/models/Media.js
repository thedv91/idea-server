import mongoose, { Schema } from 'mongoose';
import async from 'async';
import validator from 'validator';

const MediaSchema = new Schema({
    path: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, {
        timestamps: true
    });

export default mongoose.model('Media', MediaSchema);
