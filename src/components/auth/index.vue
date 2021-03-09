<template>
  <button
    class="comp-auth"
    v-if="loggedIn === false"
    open-type="getPhoneNumber"
    @getphonenumber="getPhoneNumber">
    <slot/>
  </button>
  <button
    class="comp-auth"
    v-else
    @click="emitClick">
    <slot/>
  </button>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'comp-auth',
    computed: {
      ...mapGetters('user', [ 'loggedIn' ])
    },
    methods: {
      async getPhoneNumber (e) {
        // 用户未同意授权获取手机号
        if (!e.detail.encryptedData) return

        let { encryptedData, iv } = e.detail

        /**
         *  ===============================================
         *  这里需要自行实现登录逻辑
         *  ===============================================
         **/

        // 设置 user token
        this.$store.dispatch('user/setToken', { token: '' })

        // 获取用户信息
        await this.$store.dispatch('user/updateInfo')

        // 继续之后的操作
        this.emitClick()
      },

      // 通知父组件，执行登录后的操作
      emitClick () {
        return this.$emit('click')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .comp-auth {
    display: block;
    width: 100%;
    height: auto;
    border: none;
    background-color: transparent;
    padding: 0;
    font-size: inherit;
    &:after {
      display: none;
    }
  }
</style>