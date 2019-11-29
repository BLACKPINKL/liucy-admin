import {
  maker
} from '@form-create/iview'
// 需要创建的表单项
const mixin = {
  
  methods: {
    getForm(type, data) {
      
      // 获取最终参数
      let prams = this.getPram(type, data)
      // console.log(maker);
      
      let o = {
        input : maker.input(prams.label, prams.filed, prams.value).props({
          width: prams.width
        }),
        textarea: maker.input(prams.label, prams.filed, prams.value).props({
          type,
          width: prams.width,
          autosize: {
            minRows: 5,
            maxRows: 9
          }
        }),
        radio: [],
        select: [],
        DatePicker: []
      }
      return o[type]
    },

    getPram(type, data) {
      let o = this.getId(data)
      // 基础字段
      let basic = {
        label: data['label-' + o.id], 
        filed: data['filed-' + o.id], 
        value: data['value-' + o.id] || '',
        width: data['width-' + o.id]
      }

      if(type === 'input' || type === 'textarea') return basic
      // if(type === 'radio')
      // if(type === 'select')
      // if(type === 'DatePicker')
    },
    getId(data) {
      // 获取id
      let keys = Object.keys(data)
      let o = {}
      keys.some(key => {
        if(key.includes('-')) {
          let arr = key.split('-')
          o['id'] = arr[1]
          return true
        }
      })
      return o
    }
  }
}

export default mixin