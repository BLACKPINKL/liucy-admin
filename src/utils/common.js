
//工具层 全局方法
const common = {
  methods: {
    uTdoLogin() {
      this.$router.push({path: '/login'})
    },
    uTgohome() {
      this.$router.push({path:'/'})
    },
    // 只负责弹出错误信息或成功信息  ( 无操作逻辑 )
    uTerrTips(msg) {
      this.$dlg.alert(msg, {
        messageType: 'error'
      })
    },
    // 只负责弹出错误信息或成功信息  ( 无操作逻辑 )
    uTsuccessTips(msg) {
      this.$dlg.alert(msg, {
        messageType: 'success'
      })
    },
    // 带有操作逻辑 点击按钮需要触发事件
    uTconfirmTips(msg, callback) {
      this.$dlg.alert(
        msg,
        () => {
          typeof callback === 'function' && callback()
        },
        {
          messageType: 'confirm'
        }
      )
    },
    // 带有操作逻辑 点击按钮需要触发事件
    uThanlerTips(msg, callback) {
      this.$dlg.alert(msg, () => {
        typeof callback === 'function' && callback()
      },
      {
        messageType: 'success'
      })
    },
    // 带有loading动画的
    uTmaskTips(msg) {
      // 该方法返回一个key 调用 this.$dlg.close(key) 即可关闭loading
      return this.$dlg.mask(msg)
    },
    uTclosemaskTips(key) {
      this.$dlg.close(key)
    },
    uTjoinArr(arr, sign) {
      if (!arr.length) {
        return arr
      }
      return arr.join(sign)
    }
  }
}

export default common
