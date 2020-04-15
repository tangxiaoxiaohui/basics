/* eslint-disable no-console */
const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
  assetsDir: 'static',
  pages: {
    login: {
      // page 的入口
      entry: 'src/pages/login/login.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'login.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Login Page',
      // 在这个页面中包含的块，默认情况下会包含
      chunks: ['chunk-vendors','chunk-common','login']
    },
    main: {
      // page 的入口
      entry: 'src/pages/main/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'main.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Main Page',
      // 在这个页面中包含的块，默认情况下会包含
      chunks: ['chunk-vendors','chunk-common','main']
    },
  },
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('Public', resolve('public'))
      .set('Api', resolve('src/api'))
      .set('Config', resolve('src/config'))
      .set('Views', resolve('src/views'))
      .set('Components', resolve('src/components'))
      .set('Store', resolve('src/store'))
      .set('Static', resolve('src/static'))
      .set('Lib', resolve('src/lib'))
      .set('Service', resolve('src/service'))
      .set('Utils', resolve('src/utils'))
  },
};
