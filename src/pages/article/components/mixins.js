const v = {
  methods: {
    // 添加表单select
    addOptions(params = {}, data = []) {
      this.rule.some(item => {
        console.log(item.field, params.field);
        
        if(item.field === params.field) {
          data.forEach(res => {
            console.log(res);
            
            item.options.push({
              label: res[params.labelKey],
              value: res[params.valueKey] + '',
              disabled: params.disabled || false,
            })
            // 解决没有value无法显示问题
            item.value = '0'
          })
          return true
        }
        
      })
    },
    
  },
}
export default v