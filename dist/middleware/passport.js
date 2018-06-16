"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = require("passport");
const User_1 = require("../models/User");
const request = require('request');
const InstagramStrategy = require('passport-instagram').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const OpenIDStrategy = require('passport-openid').Strategy;
const OAuthStrategy = require('passport-oauth').OAuthStrategy;
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
passport_1.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.deserializeUser((id, done) => {
    User_1.User.findById(id, (err, user) => {
        done(err, user);
    });
});
passport_1.use(new LocalStrategy({
    usernameField: 'email'
}, (email, password, done) => {
    User_1.User.findOne({
        email: email.toLowerCase()
    }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {
                msg: `Email ${email} not found.`
            });
        }
        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            if (isMatch) {
                return done(null, user);
            }
            return done(null, false, {
                msg: 'Invalid email or password.'
            });
        });
    });
}));
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.send(403);
};
exports.isAuthorized = (req, res, next) => {
    const provider = req.path.split('/').slice(-1)[0];
    const token = req.user.tokens.find((token) => token.kind === provider);
    if (token) {
        next();
    }
    else {
        res.redirect(`/auth/${provider}`);
    }
};
//# sourceMappingURL=passport.js.map