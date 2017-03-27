import Express from 'express';
import mongoose from 'mongoose';
import validator from 'validator';
import _ from 'lodash';

import { Product } from './../models';
import { getErrorMessage, generateErrors } from './Error';


export function list(req, res) {
    Product.find().then(response => {
        return res.json(response);
    }, error => {
        return res.send({
            message: getErrorMessage(error)
        });
    });
}

export function create(req, res) {
    let product = new Product(req.body);

    product.validate((err) => {
        if (err) {
            const messages = generateErrors(err.errors);
            return res.status(400).send({
                validate: messages
            });
        }

        product.save().then(data => {
            return res.json(data);
        }, err => {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        });
    });

}

export function remove(req, res) {
    const product = new Product(req.body);
    product.save().then(response => {
        return res.json(response);
    }, error => {
        return res.send({
            message: getErrorMessage(error)
        });
    });
}

export function read(req, res) {
    return res.json(req.product);
}

export function getProductByCode(req, res, next, code) {

    Product.findOne({ code: code }).then(data => {
        if (!data) {
            return res.status(400).send({
                message: 'No Product with that identifier has been found'
            });
        }
        req.product = data;
        return next();
    }, err => {
        return next(err);
    });
}