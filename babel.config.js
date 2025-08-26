module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@assets': './assets',
          '@images': './assets/images',
          '@svgs': './assets/svgs',
          '@lottie': './assets/animation',
        },
      },
    ],
    'react-native-worklets/plugin'
  ],
};
