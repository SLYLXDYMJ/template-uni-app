import * as baseConfig from './base'

let envConfig = require('./' + process.env.NODE_ENV.replace('./', ''))

export default {
  ...(baseConfig.default || baseConfig),
  ...(envConfig.default || envConfig)
}