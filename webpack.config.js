const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const EventHooksPlugin = require('event-hooks-webpack-plugin');

const style = process.env.style ? process.env.style : 'app1'

// 生产环境 chrome 扩展所需的文件
const packageFiles = [
  // 'dist',
  'icons',
  'src/inject.js',
  'src/extension.js',
  'manifest.json',
  'popup.html'
]

module.exports = {
  // devtool: process.env.NODE_ENV == 'production' ? '' : '#eval-source-map',
  devtool: '',
  entry: `./src/${style}.js`,
  output: {
    filename: './dist/app.js'
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.common.js',
      Src: path.join(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: [
            {
              test: /\.(css|less)$/,
              use: ['style-loader', 'css-loader', 'less-loader']
            }
          ],
          transformToRequire: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },

      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100000
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100000
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    process.env.NODE_ENV == 'production' && new UglifyJsPlugin({ sourceMap: false }),
    process.env.NODE_ENV == 'production' &&
      new CopyWebpackPlugin(
        packageFiles.map(file => ({ from: `./${file}`, to: `./package/${style}/${file}` }))
      ),
    process.env.NODE_ENV == 'production' && new EventHooksPlugin({
        done: () => {
            // 因为 CopyWebpackPlugin 无法在打包复制文件，所以复制的还是原先的文件
            // 使用 EventHooksPlugin 在打包后单独复制 app.js
            fs.copyFileSync('./dist/app.js', `./package/${style}/dist/app.js`)
        }
    })
  ].filter(Boolean),
  node: {
    fs: 'empty'
  }
}
