export default {
  name: 'FindMe',
  version: '1.0.0',
  extra: {
    storybookMode: process.env.STORYBOOK_MODE === 'true',
    apiUrl: process.env.API_URL,
    globalLoaderDismissTimeout: 1000,
  },
};
