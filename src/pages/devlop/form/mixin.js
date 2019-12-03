import {
  maker
} from '@form-create/iview'
import {deepCopy} from 'utils'
// 需要创建的表单项
const mixin = {
  data() {
    return {
      basicFiled: [],
      initRadiosNum: 2,
      radios: [
        
      ]
    }
  },
  
  methods: {
    getForm(type, data) {
      
      // 获取最终参数
      
      let prams = this.getPram(type, data)
      console.log('prams', prams);
      let o = {
        input : maker.input(prams.label, prams.filed, prams.value).col({
          span: parseInt(prams.width),
        }),
        textarea: maker.input(prams.label, prams.filed, prams.value).props({
          type,
          autosize: {
            minRows: 5,
            maxRows: 9
          }
        }).col({
          span: parseInt(prams.width)
        }),
        radio: maker.radio(prams.label, prams.filed, prams.value).options(this.basicFiled.radios),
        select: [],
        DatePicker: []
      }
      
      
      // console.log(maker);
      
      
      return o[type]
    },

    getFormActive(id, type) {
      let that = this
      // 公共部分
      let basic = [
        maker.input('字段名', 'filed-' + id, id).event({
          change(e) {
            that.bindModel(e, 'filed', id)
            
          }
        }),
        maker.input('label', 'label-' + id, type).event({
          change(e) {
            that.bindModel(e, 'title', id)
            
          }
        }),
        maker.input('宽度', 'width-' + id, 14).event({
          change(e) {
            that.bindModel(e, 'span', id)
            
          }
        }),
        maker.input('默认值', 'value-' + id, '默认值').event({
          change(e) {
            that.bindModel(e, 'value', id)
            
          }
        }),
      ]
      let o = {
        input: {
          key: id,
          form: basic,
        },
        textarea: {
          key: id,
          form: basic,
        },
        radio: {
          key: id,
          form: this.getRadio(basic, id)
        }
      }
      return o[type]
    },
    // radio
    getRadio(basic, id) {
      let that = this
      this.getInitRadios(id)
      basic.push(
        maker.create('i-button').domProps({
          innerHTML: '添加选项'
        })
        .props({
          type: "primary",
          size: "large",
          htmlType: "button",
          field: 'addBtn',
          show: true
        }).name('addBtn').on({
          click: () => {
            let i = ++that.initRadiosNum
            let $f = that.$refs.fc2.$f
            
            let form = maker.input(`option${i}`, `option${i}-${id}`, `option${i}`).event({
              change(e) {
                that.bindModel(e, 'options', id, `option${i}-${id}`)
              }
            })

            let formTitle = maker.input(`label${i}`, `label${i}-${id}`, `option${i}-label${i}`).event({
              change(e) {
                that.bindModel(e, 'options', id, `label${i}-${id}`)
              }
            }).col({span: 10})

            let formDelBtn = maker.create('i-button').domProps({
              innerHTML: '删除'
            }).props({
              type: "success",
              size: "default",
              htmlType: "button",
              show: true,
              field: `btn-${i}`
            }).name(`btn-${i}`).on({
              click: (e) => {
                let btns = that.$refs.fc2.$f.component()
                console.log(btns);
                
                that.handleClickDelRadio(e, btns)
                
              }
            })


            // 生成 右边radio的编辑项  
            // form为radio的value formTitle为radio的label
            $f.append(form)
            $f.append(formDelBtn)
            $f.append(formTitle)
            

            // 生成radio子集
            this.rule.some(item => {
              // 如果当前有options参数 说明是radio
              if(item._data.field === id && item._data.options) {
                // console.log('form', form);
                // 添加子集
                item._data.options.push(
                  {
                    value: form._data.value, 
                    label: formTitle._data.value, 
                    valueKey: form._data.field, 
                    labelKey: formTitle._data.field
                  }
                )
                return true
              }
              
            })
            
            
          },
        }).col({
          span: 8
        })
      )

      return basic.concat([...this.radios[0].forms, ...this.radios[1].forms])
    },
    getInitRadios(id) {
      let that = this
      // 初始option
      let arr = []
      for (let i = 1; i <= this.initRadiosNum; i++) {
        arr.push({
          forms: [
            maker.input(`option${i}`, `option${i}-${id}`, `option${i}`).event({
              change(e) {
                that.bindModel(e, `options`, id, `option${i}-${id}`)
              }
            }),
            maker.input(`label${i}`, `label${i}-${id}`, `option${i}-label${i}`).event({
              change(e) {
                that.bindModel(e, `options`, id, `label${i}-${id}`)
              }
            }).col({span: 10}),
            maker.create('i-button').domProps({
              innerHTML: '删除',
              qinjianfei: `btn-${i}`
            }).props({
              type: "success",
              size: "default",
              htmlType: "button",
              show: true,
              field: `btn-${i}`
            }).name(`btn-${i}`).on({
              click: (e) => {
                let btns = that.$refs.fc2.$f.component()
                console.log(e);
                
                that.handleClickDelRadio(e, btns)
                
                
                
              }
            })
          ] 
        })
      }
      this.radios = arr
      return this.radios

    },
    // 删除 radio 子集
    handleClickDelRadio(e, components) {
      // 获取该dom的自定义属性
      let name = e.target.qinjianfei
      let data = {}
      data[name] = name
      // this.$nextTick(() => {
        let i = this.getId(data)
      console.log(i);
        // 删除 
        this.$refs.fc2.$f.removeField(`option${i.id}-${this.id}`)
        this.$refs.fc2.$f.removeField(`label${i.id}-${this.id}`)
        this.$nextTick(() => {
          this.$refs.fc2.$f.removeField(`btn-${i.id}`)
          e.target.remove()
        })
        
        // 同步删除 生成的radio子集
        this.rule.forEach(item => {
          if(item._data.field === this.id && item._data.options) {
            item._data.options.forEach((key, index) => {
              // 只要符合条件 删除该元素
              if(key.valueKey === `option${i.id}-${this.id}`) {
                item._data.options.splice(index, 1)
              }
              
            })
          }
        })
      // })
      
      
      
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
      console.log('data', data);
      
      if(type === 'radio'){
        
        basic.radios = []
        this.radios.forEach(radio => {
          let radioParams = {
            value: '',
            label: '',
            valueKey: '', 
            labelKey: ''
          }
          
          // 判断是否是label
          radio.forms.forEach((form, i) => {
            console.log(form);
            // if(!form._data.title) return false
            if(form._data.title && !form._data.title.includes('label')) {
              radioParams.value = data[form._data.field]
              radioParams.valueKey = form.__field__
            }else if(form._data.title && form._data.title.includes('label')){
              radioParams.label = data[form._data.field]
              radioParams.labelKey = form.__field__
            }
            
          })
          
          basic.radios.push(radioParams)
        })
        console.log(basic);
        
        // 缓存字段
        this.basicFiled = basic
        return this.basicFiled
      }
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