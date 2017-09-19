const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password:{ type: String, required: true },
  passwordResetToken: String,
  passwordResetExpires: Date,

  facebook: String,
  twitter: String,
  google: String,
  github: String,
  instagram: String,
  linkedin: String,
  steam: String,
  tokens: Array,

  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String
  },
  jobs: [
    {
      companyName: { type: String, required: true },
      contactName: { type: String, required: true },
      contactPhoneNumber: { type: String, required: true },
      contactEmail: { type: String, required: true },
      jobName: { type: String, required: true },
      jobNumber: { type: String, required: true },
      jobDescription: { type: String, required: true },
      jobStatus: { type: Number, required: true },
      toolCheckouts: { type: Array, required: false }
    }
  ],
  tools: [
    {
      toolName: {type: String, require: true },
      qty: { type: Number, required: true },
      toolCost: { type: String, require: false },
      idealAmount: { type: Number, required: true },
      autoOrderQty: { type: Number, required: true }
    }
  ],
  operators: [
    {
      operatorName: {type: String, require: true},
      operatorNumber: {type: Number, require: true}
    }
  ]
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function gravatar(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const User = mongoose.model('User', userSchema);

module.exports = User;