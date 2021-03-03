import config from '@/config'

// 清除因为延迟获取 app 实例而导致的加载问题
let proxy = function (method) {
  return async (...args) => {
    await new Promise(resolve => {
      setTimeout(resolve)
    })
    
    return request[ method ](...args)
  }
}
let request = {
  get: proxy('get'),
  post: proxy('post'),
  put: proxy('put'),
  delete: proxy('delete')
}

// 控制执行顺序
setTimeout(() => {
  const vm = require('../main').default
  
  request = vm.$u
  
  /**
   *  配置统一的请求参数
   *  https://uviewui.com/js/http.html
   **/
  request.http.setConfig({
    baseUrl: config.baseUrl
  })
  
  /**
   *  请求拦截器
   *  通常在这里统一设置 请求头 等操作
   **/
  request.http.interceptor.request = function (config) {
    return config
  }
  
  /**
   *  响应拦截器
   **/
  request.http.interceptor.response = function (data) {
    /**
     *  有时（大部分时候...）判断请求是否成功
     *  并不是根据 http 状态码，而根据接口 "响应消息的状态码" 判断
     *  比如：Http Status Code 200 { code: 501, msg: "服务器错误" }
     *
     *  因为 http 状态码是 200，所以走的是成功的逻辑
     *  这时其实我们大多数想要走的是失败逻辑
     *  通常会动态的在成功响应拦截器中判断 "响应消息的状态码"
     *  若不是成功的状态码，则抛出异常
     **/
    // if (response.data.code !== 200) {
    //   // 这里通常给出全局的错误提示框
    //   uni.showToast({ icon: 'none', title: '接口返回错误：' + response.data.msg })
    //
    //   return Promise.reject('接口返回错误：' + response.data.msg)
    // }
    
    return Promise.resolve(data)
  }
})

/**
 *  例子：请求方法
 *  这个方法总会返回 Promise
 *
 *  参数规范如下：
 *  @param { Object } params  - 请求参数
 *  @param { Object } headers - 特殊的请求头部
 *
 *  注意：
 *    若为 post 请求，并且需要在动态拼接 url
 *      则在请求方法中依赖 params 自行实现
 **/
export const example = function (params = {}, headers = {}) {
  return request.get('', {
    ...params
  })
}