<template>
  <div>
    <iframe :src="src" ref="iframe"></iframe>
  </div>
</template>

<script>
// import { monitorServerURL } from '~/assets/js/utils'
export default {
  data () {
    return {
      // src: monitorServerURL + 'jobList',
      // src: 'https://www.baidu.com',
      src: 'https://www.baidu.com',
      // src: 'http://monitor_tie.test.cn/#/dashboard',
      iframeWin: {}
    }
  },
  mounted () {
    const data = {
      cmd: 'getFormJson',
      params: {
        nickname: 'user', // 此处要换成登录的用户名、密码才好
        password: '123456'
      }
    }

    const mapFrame = this.$refs.iframe
    if (mapFrame.attachEvent) { // 兼容浏览器判断
      mapFrame.attachEvent('onload', function () {
        const iframeWin = mapFrame.contentWindow
        iframeWin.postMessage(data, '*')
      })
    } else {
      mapFrame.onload = function () {
        const iframeWin = mapFrame.contentWindow
        iframeWin.postMessage(data, '*')
      }
    }
  }
}
</script>

<style scoped>
iframe{
  height: 1000px;
  width: 100%;
  border: 0;
}
</style>
