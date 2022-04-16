module.exports = function (api) {
  api.cache(false);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'inline-dotenv',
      [
        require.resolve('babel-plugin-module-resolver'), {
          root: ['./'],
          alias: {
            assets: './assets',
            components: './components',
            constants: './constants',
            storybook: './storybook',
            themes: './themes',
            utils: './utils',
            layouts: './layouts',
            navigation: './navigation',
            store: './store',
            hooks: './hooks',
          },
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
          ],
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
