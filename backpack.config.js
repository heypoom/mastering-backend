const ForkTSCheckerPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = ['./src/index.ts']

    config.resolve = {
      extensions: ['.ts', '.js', '.json'],
    }

    config.module.rules.push({
      test: /\.ts$/,
      use: [
        {
          loader: 'cache-loader',
        },
        {
          loader: 'thread-loader',
          options: {
            workers: require('os').cpus().length - 1,
            poolTimeout: Infinity,
          },
        },
        {
          loader: 'ts-loader',
          options: {
            happyPackMode: true,
            transpileOnly: true,
          },
        },
      ],
    })

    config.plugins.push(
      new ForkTSCheckerPlugin({
        checkSyntacticErrors: true,
      }),
    )

    return config
  },
}
