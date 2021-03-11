import _ from 'lodash'
import Qs from 'qs'
import Vue from 'vue'

/**
 *  将 uni 挂到 Vue 原型链中
 *  方便在 template 中调用
 *    @click="$uni.navigateTo(options)"
 **/
Vue.prototype.$uni = uni

/**
 *  优化 uni 部分方法
 **/
// 默认隐藏 toast 的图标（微信小程序默认是 success 状态）
uni._showToast = uni.showToast
uni.showToast = function (options) {
  return uni._showToast({
    icon: 'none',
    ...options
  })
}

/**
 *  设置默认分享信息
 *  ! 该功能会使所有页面都变得可以分享
 *  ! 所以建议默认分享指向首页
 *
 *  优先级：
 *    1. 按钮分享消息
 *    2. 页面分享消息
 *    3. 默认分享消息
 *
 *  按钮分享消息需要指定标签 data 属性，若为空，则按照优先级继续向下寻找
 *    data-share-title
 *    data-share-path
 *    data-share-image-url
 *
 *  页面分享消息需要指定组件 data 属性
 *    shareTitle
 *    sharePath
 *    shareImageUrl
 **/
Vue.mixin({
  onShareAppMessage ({ from, target = { dataset: {} }, webViewUrl }) {
    return _.defaults(
      // 按钮设置的分享消息，优先级最高
      {
        title: target.dataset.shareTitle,
        path: target.dataset.sharePath,
        imageUrl: target.dataset.shareImageUrl
      },
      // 页面设置的分享消息，优先级中等
      {
        title: this.shareTitle,
        path: this.sharePath,
        imageUrl: this.shareImageUrl
      },
      // 默认设置的分享消息，优先级最低
      {
        title: 'title',
        path: '/pages/index/index',
        imageUrl: null
      }
    )
  }
})