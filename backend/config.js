require('dotenv').config();

const { NODE_ENV, PORT, MONGODB_URI, JWT_SECRET } = process.env;

module.exports = {
  port: NODE_ENV === 'production' ? PORT : 4000,
  mongoURI:
    NODE_ENV === 'production'
      ? MONGODB_URI
      : 'mongodb://127.0.0.1:27017/mestodb',
  secretKey: NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
};
