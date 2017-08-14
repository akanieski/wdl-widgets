const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: './job/job.widget.ts',
  output: {
    filename: './dist/job.widget.js'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension. 
    extensions: ['.ts', '.tsx', '.js', '.scss'] // note if using webpack 1 you'd also need a '' in the array as well 
  },
  module: {
    rules: [ // loaders will work with webpack 1 or 2; but will be renamed "rules" in future 
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' }, 
      {
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'SERVICE_URL': JSON.stringify(process.env.SERVICE_URL)
    }),
    new CopyWebpackPlugin([
      {from: './job/job.widget.html', to: './dist'}
    ])
  ]
}

