import {getForm} from 'service/form-service'
const mixin = {
  data() {
    return {
      rule: []
    }
  },
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
      
    },

    // 获取表单
    loadForms(name) {
      getForm({name}).then(res => {
        this.rule = res.data.forms
      })
    },
    msg(type, title) {
      eval(`
        this.$Message.${type}('${title}', 1500)
      `)
    },
  }
}
export default mixin