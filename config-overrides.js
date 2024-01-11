module.exports = {
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      stream: require.resolve("stream-browserify"),
      url: require.resolve("url"),
      buffer: require.resolve("buffer"),
      crypto: require.resolve("crypto-browserify"),
      http: require.resolve("stream-http"),
      util: require.resolve("util"),
    },
  },
};
