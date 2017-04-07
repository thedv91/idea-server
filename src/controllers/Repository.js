import Express from 'express';
import mongoose from 'mongoose';
import validator from 'validator';
import _ from 'lodash';

import { Repository } from './../models';
import { getErrorMessage, generateErrors } from './Error';


/**
 *
 * @api {get} /api/v1/repository List repository
 * @apiName List
 * @apiGroup Repository
 * @apiVersion  1.0.0
 *
 * @apiSuccess (200) {Array} name description
 *
 * @apiSuccessExample {Array} Success-Response:
   [{
       code : value,
       name : value,
   },{
       ...
   }]
 *
 *
 */
export function list(req, res) {

    Repository.find().then(response => {
        return res.json(response);
    }, error => {
        return res.status(400).send({
            message: getErrorMessage(error)
        });
    });
}


/**
 * @api {post} /api/v1/repository Create repository
 * @apiGroup Repository
 * @apiPermission auth
 * @apiParam {String} code Repository Code
 * @apiParam {String} name Repository name
 *
 * @apiSuccess {ObjectId} _id
 * @apiSuccess {String} code Repository Code
 * @apiSuccess {String} name Repository name
 * @apiVersion 1.0.0
 * @apiHeader {String} Authorization Accesstoken for user.
 * @apiHeaderExample {Object} Header-Example:
    {
        "Authorization": "Bearer token-here"
    }
 *
 * @apiSuccessExample {Object} Success-Response:
 *
 * {
       _id  : value,
       code : value,
       name : value,
   }
 */
export function create(req, res) {
    let data = new Repository(req.body);
    data.validate((err) => {
        if (err) {
            const messages = generateErrors(err.errors);
            return res.status(400).send({
                validate: messages
            });
        }

        data.save().then(data => {
            return res.json(data);
        }, err => {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        });
    });

}

/**
 * @api {delete} /api/v1/repository/:code Delete repository
 * @apiGroup Repository
 * @apiPermission auth
 * @apiParam {String} code Repository Code
 *
 * @apiSuccess {ObjectId} _id
 * @apiSuccess {String} code Repository Code
 * @apiSuccess {String} name Repository name
 * @apiVersion 1.0.0
 * @apiHeader {String} Authorization Accesstoken for user.
 * @apiHeaderExample {Object} Header-Example:
    {
        "Authorization": "Bearer token-here"
    }
 *
 */
export function remove(req, res) {
    req.repository.remove().then((data) => {
        return res.json(data);
    }, err => {
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    });
}


/**
 * @api {get} /api/v1/repository/:code Get repository
 * @apiGroup Repository
 * @apiParam {String} code Repository Code
 *
 * @apiSuccess {ObjectId} _id
 * @apiSuccess {String} code Repository Code
 * @apiSuccess {String} name Repository name
 * @apiVersion 1.0.0
 */
export function read(req, res) {
    // return res.json(req.repository);
    req.repository.getProducts().then(datas => {
        return res.json(datas);
    }, error => {
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    });
}

/**
 * @api {put} /api/v1/repository/:code Update repository
 * @apiGroup Repository
 * @apiPermission auth
 * @apiParam {String} code Repository Code
 * @apiParam {String} [name] Repository name
 *
 * @apiSuccess {ObjectId} _id
 * @apiSuccess {String} code Repository Code
 * @apiSuccess {String} name Repository name
 * @apiVersion 1.0.0
 * @apiHeader {String} Authorization Accesstoken for user.
 * @apiHeaderExample {Object} Header-Example:
    {
        "Authorization": "Bearer token-here"
    }
 *
 */
export function update(req, res) {
    delete req.body._id;
    delete req.body.code;
    let repository = req.repository;

    repository.set(req.body);

    repository.validate((err) => {
        if (err) {
            const messages = generateErrors(err.errors);
            return res.status(400).send({
                validate: messages
            });
        }

        repository.save().then(data => {
            return res.json(data);
        }, err => {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        });
    });
}

export function removeList(req, res) {
    const codes = req.query.code.split(',');

    Repository.remove({ code: { $in: codes } }).then(response => {
        return res.json(response);
    }, error => {
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    });
}

export function getByCode(req, res, next, code) {

    Repository.findOne({ code: code }).then(data => {
        if (!data) {
            return res.status(400).send({
                message: 'No Repository with that identifier has been found'
            });
        }
        req.repository = data;
        return next();
    }, err => {
        return next(err);
    });
}