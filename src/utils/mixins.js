const mixin = {
  methods: {
    // 模态框实例化
    modalInstance (type, content, callback) {
      eval(
        `this.$Modal.${type}({
          title: '温馨提示',
          content: '${content}',
          closable: true,
          onOk: function() {
            callback()
          }
        })`
      )
      
    }
  }
}
export default mixin