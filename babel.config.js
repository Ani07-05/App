module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins:[
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@features': './src/features',
          '@service': './src/service',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@navigation': './src/navigation',
          '@styles': './src/styles',
          '@state': './src/state',
          '@types': './src/types',
        }
      }
    ]
  ]
};
