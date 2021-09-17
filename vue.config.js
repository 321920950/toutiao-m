module.exports = {

  chainWebpack: config => {
    // 项目模式
    config.when(process.env.NODE_ENv === 'production', config => {
    // 打包入口main-prod.js
      config.entry('app').clear().add('./src/main-prod.js')
      // 通过externals加载外部CDN资源  删除项目模式main-prod.js导入的各种包 并且要在index.html 添加CDN资源
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        lodash: '_',
        nprogress: 'NProgress'
      })
      // 为html插件新增属性 当项目模式时isProd = true
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })

    // 开发模式
    config.when(process.env.NODE_ENv === 'development', config => {
      // 打包入口main-dev.js

      config.entry('app').clear().add('./src/main-dev.js')

      // 为html插件新增属性 当开发模式时isProd = false
      config.plugin('html').tap(args => {
        args[0].isProd = false

        return args
      })
    })
  }

}
