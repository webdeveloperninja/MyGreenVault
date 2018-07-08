import { User } from '../models/User';

const bluebird = require('bluebird');
const cryptoHash = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const authPassport = require('passport');
const stripeService = require('../services/stripe');

export const getLogin = (req: any, res: any) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('login', {
    title: 'Login'
  });
};

export const postLogin = (req: any, res: any, next: any) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/login');
  }

  authPassport.authenticate('local', (err: any, user: any, info: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('errors', info);
      return res.redirect('/login');
    }
    req.logIn(user, (err: any) => {
      res.cookie('userId', user._id.toString());
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  })(req, res, next);
};

export const logout = (req: any, res: any) => {
  res.clearCookie('userId');
  req.logout();
  res.redirect('/login');
};

export const getSignup = (req: any, res: any) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('signup', {
    title: 'Create Account'
  });
};

export const postSignup = (req: any, res: any, next: any) => {
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
    .then((user: any) => {
      req.logIn(user, (err: any) => {
        res.cookie('userId', user._id.toString());

        // if (err) {
        //   reject(err);
        // }
        res.redirect('/');
      });
    })
    .catch(err => res.status(500).send(err));
};

function validateSignupInputs(req: any, res: any) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  return req.validationErrors();
}

function createUser(req: any, res: any) {
  return new Promise((resolve, reject) => {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      companyName: req.body.companyName,
      phoneNumber: req.body.phoneNumber,
      name: req.body.name
    });

    User.findOne({ email: req.body.email }, (err: any, existingUser: any) => {
      if (err) {
        reject(err);
      }
      if (existingUser) {
        req.flash('errors', {
          msg: 'Account with that email address already exists.'
        });
        return res.redirect('/signup');
      }
      user.save((err: any) => {
        if (err) {
          reject(err);
        }
        resolve(user);
      });
    });
  });
}

export const getAccount = (req: any, res: any) => {
  res.render('profile', {
    title: 'Account Management'
  });
};

export const getRoadmap = (req: any, res: any) => {
  res.render('roadmap', {
    title: 'Product Roadmap'
  });
};

export const postUpdateProfile = (req: any, res: any, next: any) => {
  req.assert('email', 'Please enter a valid email address.').isEmail();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/account');
  }

  User.findById(req.user.id, (err: any, user: any) => {
    if (err) {
      return next(err);
    }
    user.email = req.body.email || '';
    user.profile.name = req.body.name || '';
    user.profile.gender = req.body.gender || '';
    user.profile.location = req.body.location || '';
    user.profile.website = req.body.website || '';
    user.save((err: any) => {
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

export const postUpdatePassword = (req: any, res: any, next: any) => {
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/account');
  }

  User.findById(req.user.id, (err: any, user: any) => {
    if (err) {
      return next(err);
    }
    user.password = req.body.password;
    user.save((err: any) => {
      if (err) {
        return next(err);
      }
      req.flash('success', { msg: 'Password has been changed.' });
      res.redirect('/account');
    });
  });
};

export const postDeleteAccount = (req: any, res: any, next: any) => {
  User.remove({ _id: req.user.id }, (err: any) => {
    if (err) {
      return next(err);
    }
    req.logout();
    req.flash('info', { msg: 'Your account has been deleted.' });
    res.redirect('/');
  });
};

export const getOauthUnlink = (req: any, res: any, next: any) => {
  const provider = req.params.provider;
  User.findById(req.user.id, (err: any, user: any) => {
    if (err) {
      return next(err);
    }
    user[provider] = undefined;
    user.tokens = user.tokens.filter((token: any) => token.kind !== provider);
    user.save((err: any) => {
      if (err) {
        return next(err);
      }
      req.flash('info', { msg: `${provider} account has been unlinked.` });
      res.redirect('/account');
    });
  });
};

export const getReset = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  User.findOne({ passwordResetToken: req.params.token })
    .where('passwordResetExpires')
    .gt(Date.now())
    .exec((err: any, user: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        req.flash('errors', {
          msg: 'Password reset token is invalid or has expired.'
        });
        return res.redirect('/forgot');
      }
      res.render('reset', {
        title: 'Password Reset'
      });
    });
};

export const postReset = (req: any, res: any, next: any) => {
  req.assert('password', 'Password must be at least 4 characters long.').len(4);
  req.assert('confirm', 'Passwords must match.').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('back');
  }

  const resetPassword = () =>
    User.findOne({ passwordResetToken: req.params.token })
      .where('passwordResetExpires')
      .gt(Date.now())
      .then((user: any) => {
        if (!user) {
          req.flash('errors', {
            msg: 'Password reset token is invalid or has expired.'
          });
          return res.redirect('back');
        }
        user.password = req.body.password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        return user.save().then(
          () =>
            new Promise((resolve, reject) => {
              req.logIn(user, (err: any) => {
                if (err) {
                  return reject(err);
                }
                resolve(user);
              });
            })
        );
      });

  const sendResetPasswordEmail = (user: any) => {
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
      if (!res.finished) res.redirect('/');
    })
    .catch((err: any) => next(err));
};

export const getForgot = (req: any, res: any) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('forgot', {
    title: 'Forgot Password'
  });
};

export const postForgot = (req: any, res: any, next: any) => {
  req.assert('email', 'Please enter a valid email address.').isEmail();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/forgot');
  }

  const createRandomToken = cryptoHash.randomBytesAsync(16).then((buf: any) => buf.toString('hex'));

  const setRandomToken = (token: any) =>
    User.findOne({ email: req.body.email }).then((user: any) => {
      if (!user) {
        req.flash('errors', {
          msg: 'Account with that email address does not exist.'
        });
      } else {
        user.passwordResetToken = token;
        user.passwordResetExpires = Date.now() + 3600000; // 1 hour
        user = user.save();
      }
      return user;
    });

  const sendForgotPasswordEmail = (user: any) => {
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
