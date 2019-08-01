module.exports = {
  '/test/**': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  },
  // '/test/**': {
  //   target: 'http://wwxng.ngrok.ibanzhuan.cn/',
  //   changeOrigin: true,
  // },
};
