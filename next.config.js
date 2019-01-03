const path = require('path')
const glob = require('glob')
const RewriteImportPlugin = require('less-plugin-rewrite-import')

module.exports = {
  webpack: (config, { dev }) => {
    config.module.rules.push(
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff&outputPath=static/'
      },
      {
        test: /\.(svg|ttf|eot)$/i,
        loader: 'file-loader?outputPath=static/'
      },
      {
        test: /\.(less|config)/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              paths: [path.resolve(__dirname), path.resolve(__dirname, 'node_modules')],
              plugins: [
                new RewriteImportPlugin({
                  paths: {
                    '../../theme.config': __dirname + '/app/semantic-ui/theme.config'
                  }
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loaders: [
          'file-loader?outputPath=static/',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          'babel-loader',
          'raw-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['styles', 'node_modules']
                .map(d => path.join(__dirname, d))
                .map(g => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      }
    )
    return config
  }
}
