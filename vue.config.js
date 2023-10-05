const { defineConfig } = require('@vue/cli-service')
// const fs = require('fs')
// const appRoot = process.cwd()
module.exports = defineConfig({
    transpileDependencies: true
    // devServer: {
    //     host: 'auth.domivice.dev',
    //     port: 8080,
    //     https: {
    //         key: fs.readFileSync(`${appRoot}/certs/auth.domivice.dev.key`),
    //         cert: fs.readFileSync(`${appRoot}/certs/auth.domivice.dev.crt`),
    //         ca: fs.readFileSync(`${appRoot}/certs/myCA.pem`)
    //     }
    // }
})
