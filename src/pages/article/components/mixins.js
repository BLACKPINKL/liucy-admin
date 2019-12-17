const v = {
  methods: {
    // 添加表单select
    addOptions(arr = [], field = '', disabled = []) {
      this.rule.some(item => {
        if(item.field === field) {
          arr.data.forEach(cate => {
            item.options.push({
              label: cate.cate_name,
              value: cate.id + '',
              disabled: disabled.includes(cate.id)
            })
          })
          return true
        }
      })
    },
    
  },
}
export default v