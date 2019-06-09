const withTypescript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');
module.exports = {
  ...withCSS(withTypescript()),
  publicRuntimeConfig: { NODE_ENV: process.env.NODE_ENV },
};
