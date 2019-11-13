const path = require('path')

// Export a function. Accept the base config as the only param.
module.exports = ({ config, mode }) => {
  /* Support for React Native Web */
  config.resolve = {
    modules: ['node_modules'],
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx', 'ts', 'tsx'],
    alias: {
      'react-native': 'react-native-web'
    }
  }

  /* PostCSS Support */
  config.module.rules.push({
    test: /\.css$/,
    loaders: [
      // Loader for webpack to process CSS with PostCSS
      {
        loader: 'postcss-loader',
        options: {
          /*
            Enable Source Maps
           */
          sourceMap: true,
          /*
            Set postcss.config.js config path && ctx
           */
          config: {
            path: './.storybook/'
          }
        }
      }
    ],

    include: path.resolve(__dirname, '../')
  })

  /* TypeScript Support */
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        // Typescript compiler
        loader: require.resolve('awesome-typescript-loader')
      },
      {
        // Webpack loader to generate docgen information from Typescript React components.
        loader: require.resolve('react-docgen-typescript-loader')
      }
    ]
  })

  config.resolve.extensions.push('.ts', '.tsx')

  // Return the altered config
  return config
}
