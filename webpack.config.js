const path = require('path');

const webpack = require('webpack')

const htmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
      },

    devServer: {
        open: false,
        port: 3000,
        contentBase: 'src',
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html'
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
            { test: /\.css$/, use:['style-loader', 'css-loader']},
            // { test: /\.(png|svg|jpg|gif)$/, use: 'url-loader?limit=1&name=[name].[ext]' },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      name: '[hash:8]-[name].[ext]',
                      limit: 1
                    }
                  }
                ]
            },
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },
            { test: /\.vue$/, use: 'vue-loader' }
        ]
    },
    resolve: {
      alias: {
        "vue$": 'vue/dist/vue.js'
      }
    }
  };