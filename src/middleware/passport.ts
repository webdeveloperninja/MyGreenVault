import { deserializeUser, serializeUser, use } from 'passport';

import { User } from '../models/User';

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

serializeUser((user: any, done: any) => {
  done(null, user.id);
});

deserializeUser((id: any, done: any) => {
  User.findById(id, (err: any, user: any) => {
    done(err, user);
  });
});

use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    (email: any, password: any, done: any) => {
      User.findOne(
        {
          email: email.toLowerCase()
        },
        (err: any, user: any) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, {
              msg: `Email ${email} not found.`
            });
          }
          user.comparePassword(password, (err: any, isMatch: any) => {
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
        }
      );
    }
  )
);

export const isAuthenticated = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send(403);
};

export const isAuthorized = (req: any, res: any, next: any) => {
  const provider = req.path.split('/').slice(-1)[0];
  const token = req.user.tokens.find((token: any) => token.kind === provider);
  if (token) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};
