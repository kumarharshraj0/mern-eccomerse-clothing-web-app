const User = require('../models/User');
const cloudinary = require('../config/cloudinary');

exports.me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password -refreshTokens');
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const payload = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, payload, { new: true }).select('-password -refreshTokens');
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.uploadAvatar = async (req, res, next) => {
  try {
    const { dataUrl } = req.body;
    if (!dataUrl) return res.status(400).json({ message: 'No image provided' });
    const upload = await cloudinary.uploader.upload(dataUrl, { folder: 'avatars', transformation: [{ width: 500, height: 500, crop: 'thumb' }] });
    const user = await User.findByIdAndUpdate(req.user._id, { avatar: { public_id: upload.public_id, url: upload.secure_url } }, { new: true }).select('-password -refreshTokens');
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.addAddress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const addr = req.body;
    if (addr.default) user.addresses.forEach((a) => (a.default = false));
    user.addresses.push(addr);
    await user.save();
    res.json(user.addresses);
  } catch (err) {
    next(err);
  }
};

exports.updateAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
    const addr = user.addresses.id(id);
    if (!addr) return res.status(404).json({ message: 'Address not found' });
    Object.assign(addr, req.body);
    if (req.body.default) user.addresses.forEach((a) => (a.default = a._id.equals(id)));
    await user.save();
    res.json(user.addresses);
  } catch (err) {
    next(err);
  }
};

exports.deleteAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
    user.addresses.id(id)?.remove();
    await user.save();
    res.json(user.addresses);
  } catch (err) {
    next(err);
  }
};
