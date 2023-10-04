module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@src': './src',
            '@api': './src/api',
            '@assets': './src/assets',
            '@components': './src/components',
            '@custom': './src/custom',
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
