import mongoose, { Schema } from 'mongoose';
import async from 'async';
import validator from 'validator';
import fs from 'fs';


const RepositorySchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        validate: {
            isAsync: true,
            validator: function (v, cb) {
                const self = this;
                const Repository = self.model('Repository');
                Repository.findOne({
                    code: v,
                    _id: { '$ne': self._id }
                }).then(doc => {
                    cb(!doc);
                }, err => {
                    cb(true);
                });
            },
            message: '{PATH} with value {VALUE} already exists!'
        }
    },
    name: {
        type: String,
        required: true
    },
    description: String

}, {
        timestamps: true
    });


RepositorySchema.post('remove', function (doc) {
    fs.unlink(doc.image);
});


RepositorySchema.methods.getProducts = function () {
    return this.model('Product').find({ repositoryId: this._id });
};


export default mongoose.model('Repository', RepositorySchema);
