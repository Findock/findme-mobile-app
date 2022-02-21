module.exports = function (api) {
  api.cache(true);
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
          },
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
          ],
        },
      ],
    ],
  };
};
