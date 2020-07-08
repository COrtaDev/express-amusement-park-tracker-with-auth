const express = require('express');
const { body, check, validationResult } = require('express-validator');
const { csrfProtection, asyncHandler } = require('./utils');
const db = require('../db/models')

const router = express.Router();
// async const emails = await db.User.findAll({ emailAddress });

const userValidators = [
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for First Name')
        .isLength({ max: 50 })
        .withMessage('First Name must not be more than 50 characters long'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Last Name')
        .isLength({ max: 50 })
        .withMessage('Last Name must not be more than 50 characters long'),
    check('emailAddress')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Email Address')
        .isLength({ max: 255 })
        .withMessage('Email Address must not be more than 255 characters long')
        .isEmail()
        .withMessage('Email Address must be a valid email'),
    body('emailAddress')
        .custom(value => {
            return db.User.findUserByEmail(value).then(user => {
                if (user) {
                    return Promise.reject('E-mail already in use');
                }
            })
        }),
    check('password')
        .isInt({ min: 0 })
        .withMessage('Please provide a valid positive integer for Riders per Vehicle'),
    check('confirmPassword')
        .exists({ checkFalsy: true })
        .withMessage('Confirmation Password is a required field'),
    body('confirmationPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match');
            }
            return true;
        }),
];

router.get('/user/register', csrfProtection, asyncHandler(async (req, res) => {
    const user = await db.User.build({});                  /// in the other routes they call it csrfToken
    res.render('user-register', { user, title: "Register", token: req.csrfToken() });
}));

router.post('/user/register', csrfProtection, userValidators, asyncHandler(async (req, res) => {
    const user = {
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword
    } = req.body;


}));

////
// const { body } = require('express-validator');

// app.post('/user', body('email').custom(value => {
//     return User.findUserByEmail(value).then(user => {
//         if (user) {
//             return Promise.reject('E-mail already in use');
//         }
//     });
// }), (req, res) => {
//     // Handle the request
// });
