import jwt from 'jsonwebtoken';

export const createActivatioToken = (payload) =>
  jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: '2d',
  });

export const createResetToken = (payload) =>
  jwt.sign(payload, process.env.RESET_TOKEN_SECRET, {
    expiresIn: '6h',
  });
