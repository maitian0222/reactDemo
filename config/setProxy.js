module.exports = {
  '/test/**': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  },
};
