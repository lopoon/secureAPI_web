module.exports = {
  entry: {
    home: './src/Home.js',
    contact: './src/component/LoginPage.tsx',
    app: './src/App.tsx' // This is your SPA
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/dist'
  },
  resolve: {
    alias: {
      stream: require.resolve('stream-browserify'),
    },
    fallback: {
      "buffer": require.resolve("buffer/")
    }
  }
};