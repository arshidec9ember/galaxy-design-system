// terse cssr
const { terseCssr } = require('./terse-cssr')
const { replaceDefine, outDirs } = require('../utils')

;(async () => {
  await terseCssr()
  await replaceDefine(outDirs, {
    __DEV__: "process.env.NODE_ENV !== 'production'"
  })
})()
