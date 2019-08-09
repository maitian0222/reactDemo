// module.exports = {
//   plugins: [],
//   module: {
//     rules: [
//       {
//         test: /\.(ts|tsx)$/,
//         loader: require.resolve('babel-loader'),
//       },
//     ],
//   },
// };

//全控制模式
module.exports = async ({ config, mode }) => {
  config.resolve.extensions = [
    '.mjs',
    '.web.ts',
    '.ts',
    '.web.tsx',
    '.tsx',
    '.web.js',
    '.js',
    '.json',
    '.web.jsx',
    '.jsx',
  ];
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
  });
  return config;
};
