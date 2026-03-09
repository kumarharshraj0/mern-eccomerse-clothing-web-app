const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const addressSchema = new mongoose.Schema({
  label: String,
  name: String,
  phone: String,
  line1: String,
  line2: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
  default: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    profileImage: { type: String },
    roles: { type: [String], default: ['user'] },
    isVerified: { type: Boolean, default: true },
    verificationToken: { type: String },

    /* OTP BASED RESET */
    resetPasswordOTP: { type: String },
    resetPasswordExpires: Date,

    refreshTokens: [{ token: String, createdAt: Date }],
    addresses: [addressSchema],
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        qty: { type: Number, default: 1 },
        price: Number,
        title: String,
        image: Object
      }
    ],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
  },
  { timestamps: true }
);

// password hash
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.generateVerificationToken = function () {
  this.verificationToken = uuidv4();
  return this.verificationToken;
};

/* 🔑 OTP METHOD */
userSchema.methods.generateResetPasswordOTP = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  this.resetPasswordOTP = crypto
    .createHash('sha256')
    .update(otp)
    .digest('hex');

  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 min

  return otp; // plain OTP (email ke liye)
};

module.exports = mongoose.model('User', userSchema);
