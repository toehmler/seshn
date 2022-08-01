module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ],
  plugins: [
    'module:react-native-dotenv',
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@/api': './src/api',
          '@/assets': './src/assets',
          '@/constants': './src/constants',
          '@/components': './src/components',
          '@/helpers': './src/helpers',
          '@/hooks': './src/hooks',
          '@/navigation': './src/navigation',
          '@/redux': './src/redux',
          '@/screens': './src/screens',
          '@/types': './src/types',
          '@/utils': './src/utils',
        },
      },
    ],
  ],
};
