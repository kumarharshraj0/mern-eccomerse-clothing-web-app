const cloudinary = require('../config/cloudinary');
const User = require('../models/User');
const transporter = require('../config/nodemailer');
const templates = require('../utils/emailTemplates');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


/* ---------------------------------------------------
   SIGNUP
---------------------------------------------------- */
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    const user = new User({ name, email, password });
    // isVerified defaults to true now
    await user.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* ---------------------------------------------------
   VERIFY EMAIL
---------------------------------------------------- */
/* ---------------------------------------------------
   LOGIN
---------------------------------------------------- */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

    const accessToken = jwt.sign(
      { id: user._id, roles: user.roles },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      message: 'Login successful',
      user: { id: user._id, email: user.email, name: user.name, roles: user.roles },
      accessToken,
      refreshToken
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* ---------------------------------------------------
   REFRESH TOKEN
---------------------------------------------------- */
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;
    if (!token) return res.status(401).json({ message: 'No refresh token' });

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Invalid refresh token' });

      const user = await User.findById(decoded.id);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const newAccessToken = jwt.sign({ id: user._id, roles: user.roles }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
      const newRefreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

      return res.json({
        message: 'Token refreshed',
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* ---------------------------------------------------
   LOGOUT
---------------------------------------------------- */
exports.logout = async (req, res) => {
  try {
    return res.json({ message: 'Logged out successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* ---------------------------------------------------
   GET USER PROFILE
---------------------------------------------------- */
exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({ user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* ---------------------------------------------------
   FORGOT PASSWORD
---------------------------------------------------- */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = user.generateResetPasswordOTP();
    await user.save({ validateBeforeSave: false });

    const mail = templates.resetPassword(otp);
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: mail.subject,
      html: mail.html
    });

    return res.json({ message: 'Password reset OTP sent to email' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


/* ---------------------------------------------------
   RESET PASSWORD
---------------------------------------------------- */
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    const hashedOtp = crypto
      .createHash('sha256')
      .update(otp)
      .digest('hex');

    const user = await User.findOne({
      email,
      resetPasswordOTP: hashedOtp,
      resetPasswordExpires: { $gt: Date.now() }
    }).select('+password');

    if (!user)
      return res.status(400).json({ message: 'Invalid or expired OTP' });

    user.password = password;
    user.resetPasswordOTP = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.json({ message: 'Password reset successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* ---------------------------------------------------
   UPLOAD PROFILE PICTURE
---------------------------------------------------- */
exports.uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id;
    const { image } = req.body;
    if (!image) return res.status(400).json({ message: 'No image provided' });

    const uploaded = await cloudinary.uploader.upload(image, { folder: 'profile_pictures' });
    const user = await User.findByIdAndUpdate(userId, { profileImage: uploaded.secure_url }, { new: true }).select('-password');

    return res.json({ message: 'Profile picture uploaded', user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* ---------------------------------------------------
   DELETE PROFILE PICTURE
---------------------------------------------------- */
exports.deleteProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.profileImage) return res.status(400).json({ message: 'No profile picture to delete' });

    const publicId = user.profileImage.split('/').slice(-2).join('/').split('.')[0];
    await cloudinary.uploader.destroy(publicId);

    user.profileImage = null;
    await user.save();

    return res.json({ message: 'Profile picture deleted successfully', user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


/* ---------------------------------------------------
   CHANGE PASSWORD (LOGGED IN USER - NO OTP)
---------------------------------------------------- */
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findById(userId).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword; // pre-save hook will hash
    await user.save();

    return res.json({ message: 'Password changed successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
