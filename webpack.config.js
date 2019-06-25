const path = require('path');

module.exports = {
  entry: './src/topo_circle.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
