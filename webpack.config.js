const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');

module.exports = (_, argv) => {
  const isProduction = argv.mode === 'production';

  // Load manifest.json and extract the version
  const manifestPath = path.resolve(__dirname, 'public', isProduction ? 'manifest-prod.json' : 'manifest-stg.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const version = manifest.version;

  console.log(`Building @${version} build:${argv.mode}`);

  const config = {
    entry: {
      popup: './src/popup/index.tsx',
      content: './src/content/index.ts',
      background: './src/background/index.ts',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'],
      alias: {
        '@': path.resolve(__dirname, 'src'),  // Maps "@/*" to "./src/*"
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        },
        {
          test: /\.s[ac]ss$/i, // Matches .scss and .sass files
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',        // Translates CSS into CommonJS
            'sass-loader'   // Compiles Sass to CSS
          ],
        },
        {
          test: /\.css$/i, // Matches .css files
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[hash].[ext]',
                outputPath: 'assets/images',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/popup/popup.html',
        filename: 'popup.html',
        chunks: ['popup'],
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public'),
            to: '.',
            globOptions: {
              ignore: ['**/manifest-prod.json', '**/manifest-stg.json'], // Exclude manifest files
            },
          },
          {
            from: manifestPath,
            to: 'manifest.json',
          }
        ],
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',  // Generates a separate CSS file
      }),
    ],
  };

  return config;
};
