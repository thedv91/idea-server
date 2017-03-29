import mongoose, { Schema } from 'mongoose';
import async from 'async';
import validator from 'validator';
import fs from 'fs';


const ProductSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        validate: {
            isAsync: true,
            validator: function (v, cb) {
                const self = this;
                const Product = self.model('Product');
                Product.findOne({
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
    description: String,
    image: String,
    price: Number,
    total: Number,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, {
        timestamps: true
    });


ProductSchema.post('remove', function (doc) {
    fs.unlink(doc.image);
});



export default mongoose.model('Product', ProductSchema);
