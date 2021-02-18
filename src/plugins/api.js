/**
 *  引入所有的 接口层 方法
 *  使其挂载到 Vue 原型中
 *  在组件中可以使用 this.$api[name] 的方式调用
 **/
import Vue from 'vue'
import * as api from '../api'

Vue.prototype.$api = api
