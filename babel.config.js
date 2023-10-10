module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            '@src': './src',
            '@api': './src/api',
            '@assets': './src/assets',
            '@common': './src/common',
            '@components': './src/components',
            '@constants': './src/constants',
            '@helpers': './src/helpers',
            '@hooks': './src/hooks',
            '@navigation': './src/navigation',
            '@redux': './src/redux',
            '@screens': './src/screens',
            '@utils': './src/utils',
          },
        },
      ],
    ],
  };
};
