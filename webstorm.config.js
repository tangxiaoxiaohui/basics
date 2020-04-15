'use strict';
const path = require('path');

function resolve(dir) {
	return path.join(__dirname, '.', dir)
}

module.exports = {
	context: path.resolve(__dirname, './'),
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'@': resolve('src'),
      'Public': resolve('public'),
			'Api': resolve('src/api'),
			'Config': resolve('src/config'),
      'Service': resolve('src/service'),
      'Pages': resolve('src/pages'),
      'Components': resolve('src/Components'),
      'Store': resolve('src/store'),
      'Static': resolve('src/static'),
      'Lib': resolve('src/lib'),
			'Util': resolve('src/util')
		}
	}
};
