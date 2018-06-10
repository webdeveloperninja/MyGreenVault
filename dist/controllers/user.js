"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const bluebird = require('bluebird');
const cryptoHash = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const authPassport = require('passport');
const stripeService = require('../services/stripe');
exports.getLogin = (req, res) => {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('account/login', {
        title: 'Login'
    });
};
exports.postLogin = (req, res, next) => {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });
    const errors = req.validationErrors();
    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/login');
    }
    authPassport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('errors', info);
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    })(req, res, next);
};
exports.logout = (req, res) => {
    req.logout();
    res.redirect('/login');
};
exports.getSignup = (req, res) => {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('account/signup', {
        title: 'Create Account'
    });
};
exports.postSignup = (req, res, next) => {
    if (!req.body) {
        return;
    }
    const errors = validateSignupInputs(req, res);
    if (errors && errors.length) {
        req.flash('errors', errors);
        res.redirect('/signup');
        return;
    }
    const email = req.body.email;
    createUser(req, res)
        .then(user => {
        req.logIn(user, (err) => {
            // if (err) {
            //   reject(err);
            // }
            res.redirect('/');
        });
    })
        .catch(err => res.status(500).send(err));
};
function validateSignupInputs(req, res) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
    req.sanitize('email').normalizeEmail({ remove_dots: false });
    return req.validationErrors();
}
function createUser(req, res) {
    return new Promise((resolve, reject) => {
        const user = new User_1.User({
            email: req.body.email,
            password: req.body.password,
            companyName: req.body.companyName,
            phoneNumber: req.body.phoneNumber,
            name: req.body.name
        });
        User_1.User.findOne({ email: req.body.email }, (err, existingUser) => {
            if (err) {
                reject(err);
            }
            if (existingUser) {
                req.flash('errors', {
                    msg: 'Account with that email address already exists.'
                });
                return res.redirect('/signup');
            }
            user.save((err) => {
                if (err) {
                    reject(err);
                }
                resolve(user);
            });
        });
    });
}
exports.getAccount = (req, res) => {
    res.render('account/profile', {
        title: 'Account Management'
    });
};
exports.getRoadmap = (req, res) => {
    res.render('roadmap', {
        title: 'Product Roadmap'
    });
};
exports.postUpdateProfile = (req, res, next) => {
    req.assert('email', 'Please enter a valid email address.').isEmail();
    req.sanitize('email').normalizeEmail({ remove_dots: false });
    const errors = req.validationErrors();
    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/account');
    }
    User_1.User.findById(req.user.id, (err, user) => {
        if (err) {
            return next(err);
        }
        user.email = req.body.email || '';
        user.profile.name = req.body.name || '';
        user.profile.gender = req.body.gender || '';
        user.profile.location = req.body.location || '';
        user.profile.website = req.body.website || '';
        user.save((err) => {
            if (err) {
                if (err.code === 11000) {
                    req.flash('errors', {
                        msg: 'The email address you have entered is already associated with an account.'
                    });
                    return res.redirect('/account');
                }
                return next(err);
            }
            req.flash('success', { msg: 'Profile information has been updated.' });
            res.redirect('/account');
        });
    });
};
exports.postUpdatePassword = (req, res, next) => {
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
    const errors = req.validationErrors();
    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/account');
    }
    User_1.User.findById(req.user.id, (err, user) => {
        if (err) {
            return next(err);
        }
        user.password = req.body.password;
        user.save((err) => {
            if (err) {
                return next(err);
            }
            req.flash('success', { msg: 'Password has been changed.' });
            res.redirect('/account');
        });
    });
};
exports.postDeleteAccount = (req, res, next) => {
    User_1.User.remove({ _id: req.user.id }, (err) => {
        if (err) {
            return next(err);
        }
        req.logout();
        req.flash('info', { msg: 'Your account has been deleted.' });
        res.redirect('/');
    });
};
exports.getOauthUnlink = (req, res, next) => {
    const provider = req.params.provider;
    User_1.User.findById(req.user.id, (err, user) => {
        if (err) {
            return next(err);
        }
        user[provider] = undefined;
        user.tokens = user.tokens.filter((token) => token.kind !== provider);
        user.save((err) => {
            if (err) {
                return next(err);
            }
            req.flash('info', { msg: `${provider} account has been unlinked.` });
            res.redirect('/account');
        });
    });
};
exports.getReset = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    User_1.User.findOne({ passwordResetToken: req.params.token })
        .where('passwordResetExpires')
        .gt(Date.now())
        .exec((err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('errors', {
                msg: 'Password reset token is invalid or has expired.'
            });
            return res.redirect('/forgot');
        }
        res.render('account/reset', {
            title: 'Password Reset'
        });
    });
};
exports.postReset = (req, res, next) => {
    req.assert('password', 'Password must be at least 4 characters long.').len(4);
    req.assert('confirm', 'Passwords must match.').equals(req.body.password);
    const errors = req.validationErrors();
    if (errors) {
        req.flash('errors', errors);
        return res.redirect('back');
    }
    const resetPassword = () => User_1.User.findOne({ passwordResetToken: req.params.token })
        .where('passwordResetExpires')
        .gt(Date.now())
        .then((user) => {
        if (!user) {
            req.flash('errors', {
                msg: 'Password reset token is invalid or has expired.'
            });
            return res.redirect('back');
        }
        user.password = req.body.password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        return user.save().then(() => new Promise((resolve, reject) => {
            req.logIn(user, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(user);
            });
        }));
    });
    const sendResetPasswordEmail = (user) => {
        if (!user) {
            return;
        }
        const transporter = nodemailer.createTransport({
            service: 'SendGrid',
            auth: {
                user: process.env.SENDGRID_USER,
                pass: process.env.SENDGRID_PASSWORD
            }
        });
        const mailOptions = {
            to: user.email,
            from: 'rsmith5901@gmail.com',
            subject: 'Your Green Vault password has been changed',
            text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
        };
        return transporter.sendMail(mailOptions).then(() => {
            req.flash('success', { msg: 'Success! Your password has been changed.' });
        });
    };
    resetPassword()
        .then(sendResetPasswordEmail)
        .then(() => {
        if (!res.finished)
            res.redirect('/');
    })
        .catch((err) => next(err));
};
exports.getForgot = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.render('account/forgot', {
        title: 'Forgot Password'
    });
};
exports.postForgot = (req, res, next) => {
    req.assert('email', 'Please enter a valid email address.').isEmail();
    req.sanitize('email').normalizeEmail({ remove_dots: false });
    const errors = req.validationErrors();
    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/forgot');
    }
    const createRandomToken = cryptoHash.randomBytesAsync(16).then((buf) => buf.toString('hex'));
    const setRandomToken = (token) => User_1.User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            req.flash('errors', {
                msg: 'Account with that email address does not exist.'
            });
        }
        else {
            user.passwordResetToken = token;
            user.passwordResetExpires = Date.now() + 3600000; // 1 hour
            user = user.save();
        }
        return user;
    });
    const sendForgotPasswordEmail = (user) => {
        if (!user) {
            return;
        }
        const token = user.passwordResetToken;
        const transporter = nodemailer.createTransport({
            service: 'SendGrid',
            auth: {
                user: process.env.SENDGRID_USER,
                pass: process.env.SENDGRID_PASSWORD
            }
        });
        const mailOptions = {
            to: user.email,
            from: 'rsmith5901@gmail.com',
            subject: 'Reset your password on Green Vault',
            text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://${req.headers.host}/reset/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };
        return transporter.sendMail(mailOptions).then(() => {
            req.flash('info', {
                msg: `An e-mail has been sent to ${user.email} with further instructions.`
            });
        });
    };
    createRandomToken
        .then(setRandomToken)
        .then(sendForgotPasswordEmail)
        .then(() => res.redirect('/forgot'))
        .catch(next);
};
//# sourceMappingURL=user.js.map