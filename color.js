const path = require('path');
const { generateTheme, getLessVars } = require('antd-theme-generator');

const options = {
  stylesDir: path.join(__dirname, './src/styles'),
  antDir: path.join(__dirname, './node_modules/antd'),
  varFile: path.join(__dirname, './src/styles/vars.less'),
  mainLessFile: path.join(__dirname, './src/styles/main.less'),
  themeVariables: [
    '@primary-color',
    '@secondary-color',
    '@text-color',
    '@text-color-secondary',
    '@heading-color',
    '@layout-body-background',
    '@btn-primary-bg',
    '@layout-header-background',
  ],
  indexFileName: 'index.html',
  outputFilePath: path.join(__dirname, './public/static/color.less'),
};

generateTheme(options)
  .then((less) => {
    console.log('主题生成成功!');
  })
  .catch((error) => {
    console.log('Error', error);
  });
