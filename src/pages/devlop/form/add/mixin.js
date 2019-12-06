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
        input : maker.input(prams.label, prams.filed, prams.value).props({
          placeholder: prams.place,
        }).col({
          span: parseInt(prams.width),
          
        }).validate([{
          required: prams.required,
          message: `请输入${prams.label}`,
          trigger: 'blur'
        }]),
        textarea: maker.input(prams.label, prams.filed, prams.value).props({
          type,
          placeholder: prams.place,
          autosize: {
            minRows: 5,
            maxRows: 9
          }
        }).col({
          span: parseInt(prams.width)
        }).validate([{
          required: prams.required,
          message: `请输入${prams.label}`,
          trigger: 'blur'
        }]),
        radio: maker.radio(prams.label, prams.filed, prams.value).options(this.basicFiled.radios).validate([{
          required: prams.required,
          message: `请选择${prams.label}`,
          trigger: 'blur'
        }]),
        checkbox: maker.checkbox(prams.label, prams.filed, [prams.value])
        .options(this.basicFiled.radios)
        .validate([{
          type: 'array',
          required: prams.required,
          message: `请选择${prams.label}`,
          trigger: 'blur'
        }]),
        select: maker.select(prams.label, prams.filed, [prams.value]).
        props({
          placeholder: prams.place,
        })
        .options(this.basicFiled.radios)
        .validate([{
          type: 'array',
          required: prams.required,
          message: `请选择${prams.label}`,
          trigger: 'blur'
        }]),
        datePicker: maker.date(prams.label,prams.filed, new Date()).props({
          type: 'datetime',
          startDate: new Date()
        }).validate([{
          type: 'date',
          required: prams.required,
          message: `请选择${prams.label}`,
          trigger: 'blur'
        }]),
        // 上传
        upload: maker.upload(prams.label, prams.filed, [])
        .props({
          action: prams.action,
          multiple: true,
          type: 'select',
          uploadType: 'image',
          name: prams.filed,
          'on-success': function(res,file) {
            console.log('upload success', res, file);
            
          },
          'on-error': function(err,file) {
            console.log('upload err', err, file);
            
          },
          'on-preview': function(file) {
            console.log('upload preview', file);
            
          },
        }).validate({
          required: prams.required,
          type: 'array',
          message: '请上传图片',
          trigger: 'change'
        }),
      }
      
      
      // console.log(maker);
      
      
      return o[type]
    },
    // 获取表单编辑区所对应的表单
    getFormActive(id, type) {
      let that = this
      // 公共部分
      let basic = [
        maker.input('字段名', 'filed-' + id, id).event({
          change(e) {
            that.bindModel(e, 'filed', id)
            
          }
        }),
        maker.input('标题', 'label-' + id, type).event({
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
        maker.input('占位内容', 'place-' + id, '请输入xxx').event({
          change(e) {
            that.bindModel(e, 'placeholder', id)
            
          }
        }),
        maker.checkbox('是否必填', 'required-' + id, [false]).options([
          {value: true, label: ''}
        ]).event({
          'on-change': (e) => {
            that.bindModel(e, 'required', id)
            
          }
        }),
      ]
      let radio = this.getRadio(basic, id)


      // 如果是日期 需要把默认的value框改成日期选择框
      if(type === 'datePicker') {
        basic[3] = maker.date('默认值', 'value-' + id, new Date()).props({
          type: 'datetime',
          startDate: new Date()
        }).event({
          change(e) {
            that.bindModel(e, 'value', id)
            
          }
        })
      }
      if(type === 'upload') {
        basic[3] = maker.input('上传地址', 'action-' + id, '文件上传地址').event({
          change(e) {
            that.bindModel(e, 'action', id)
            
          }
        })
        
      }
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
          form: radio
        },
        checkbox: {
          key: id,
          form: radio
        },
        select: {
          key: id,
          form: radio
        },
        datePicker: {
          key: id,
          form: basic,
        },
        upload: {
          key: id,
          form: basic,
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
            // option的值
            maker.input(`option${i}`, `option${i}-${id}`, `option${i}`).event({
              change(e) {
                that.bindModel(e, `options`, id, `option${i}-${id}`)
              }
            }),

            // option的label
            maker.input(`label${i}`, `label${i}-${id}`, `option${i}-label${i}`).event({
              change(e) { 
                that.bindModel(e, `options`, id, `label${i}-${id}`)
              }
            }).col({span: 10}),

            // 删除option按钮
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
      return arr

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
    // 获取对应表单所需要的属性值
    getPram(type, data) {
      let o = this.getId(data)
      console.log('data', data);
      
      // 基础字段
      let basic = {
        label: data['label-' + o.id], 
        filed: data['filed-' + o.id], 
        value: data['value-' + o.id] || '',
        width: data['width-' + o.id],
        place: data['place-' + o.id] || '',
        required: data['required-' + o.id][0] || false,
      }


      if(type === 'input' || type === 'textarea' || type === 'datePicker') return basic
      console.log('data', data);
      
      if(type === 'radio' || type === 'checkbox' || type === 'select'){
        
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
              // 如果当前是多选框 需要把值放入数组中
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

      if(type === 'upload') {
        delete basic.value
        basic['action'] = data['action-' + o.id]
        return basic
      }
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