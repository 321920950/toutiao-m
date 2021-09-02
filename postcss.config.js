// PostCss的配置
// PostCss是基于node.js运行的一个处理css的工具
// 所以它的配置文件也是在node.js中
module.exports = {
// 配置要使用的相关插件
  plugins: {
    // 自动添加浏览器厂商声明前缀,用来兼容不同的浏览器
    // VueCli 已经在内部默认配置了
    // autoprefixer: {
    // 用来配置要兼容到的系统(浏览器)环境
    // 现在已经不用这个了 而是在
    // .browserslistrc 文件来配置兼容的环境信息
    //   overrideBrowsersList: ['Android >= 4.1', 'iOS >= 7.1']
    // },

    // 把px转为rem
    // vant 组件库都是基于逻辑像素375写的
    // 设计稿需要转换成375
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}

// 动态设置rootValue的大小
// const autoprefixer = require('autoprefixer')
// const pxtorem = require('postcss-pxtorem')
// module.exports = ({ file }) => {
//   let remUnit
//   if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
//     remUnit = 37.5
//   } else {
//     remUnit = 75
//   }
//   return {
//     plugins: [
//       autoprefixer(),
//       pxtorem({
//         rootValue: remUnit,
//         propList: ['*'],
//         selectorBlackList: ['van-circle__layer']
//       })
//     ]
//   }
// }
