<template>
  <view class="comp-auth" @click="emitClick">
    <slot/>

    <!-- 遮盖层 -->
    <button
      class="comp-auth-mask"
      v-if="loggedIn === false"
      open-type="getPhoneNumber"
      @getphonenumber="getPhoneNumber"
      @click.stop/>
  </view>
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
    position: relative;
    &-mask {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 5;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
</style>