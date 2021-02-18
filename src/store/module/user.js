/** 记住密码时，存入 Storage 中的 key 值 **/
const KEY_TOKEN = 'token'

/** 登录页面路由 **/
const LOGIN_PATH = '/page/login/index'

export default {
  namespaced: true,
  state: {
    /**
     *  用户身份标识
     **/
    token:
      uni.getStorageSync(KEY_TOKEN) ||
      null,
    
    /**
     *  用户信息
     **/
    info: null
  },
  getters: {
    /**
     *  当前用户是否已登录
     **/
    loggedIn (state) {
      return !!state.token
    }
  },
  actions: {
    /**
     *  设置 user token
     *  @param { String }  token - token
     **/
    setToken ({ commit }, { token }) {
      commit('SET_TOKEN', token)
      uni.setStorageSync(KEY_TOKEN, token)
    },
    
    /**
     *  验证用户身份是否有效
     *  @return Boolean
     **/
    check ({ state }) {
      return Boolean(state.token)
    },
    
    /**
     *  更新用户信息并返回用户信息
     *  @return Object
     **/
    async updateInfo ({ commit, dispatch }) {
      let user = { name: 'jason' }
  
      commit('SET_INFO', user)
  
      return user
    },
    
    /**
     *  登出
     *  清空用户相关的所有信息
     *  清空 Storage 中的 token
     **/
    logout ({ commit }) {
      commit('SET_TOKEN', null)
      commit('SET_INFO', null)
      
      uni.removeStorageSync(KEY_TOKEN)
    },
    
    /**
     *  重定向到登录页面
     *  用于登出，用户身份验证失败等场景
     **/
    goLogin ({ commit }) {
      uni.navigateTo({
        url: LOGIN_PATH
      })
    },
    
    /**
     *  登出并且重定向到登录页面
     **/
    logoutAndGoLogin ({ dispatch }) {
      dispatch('logout')
      dispatch('goLogin')
    }
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_INFO (state, info) {
      state.info = info
    }
  }
}