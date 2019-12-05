<template>
  <div>
    <Row>
      <Col :span="1" v-for="item in formTag" :key="item.key">
        <Tag @click.native="handleClick(item)" color="primary">{{item.key}}</Tag>
      </Col>

      <Col span="12" class="form_edit_right">
      <div class="form_edit_box">
        <Button type="primary" @click="handleClickBtn">
          生成表单
        </Button>
      </div>
        <div class="form_edit_box">
          <Form style="width: 100%" ref="formInline" :model="form" :rules="{name: [{ required: true, message: '请填写该表单唯一名', trigger: 'change' }]}">
            <FormItem label="表单名" prop="name" style="margin-bottom: 2px">
              <Input type="text" v-model="form.name" style="width: 200px" placeholder="Username">
              </Input>
            </FormItem>
          </Form>
        </div>
        
      </Col>
    </Row>
    
    <Row class="form_split">

      <Split v-model="split1" >
        <div slot="left" class="demo-split-pane">
          <CellGroup @on-click="handleClickForm">
            <Cell title="" :name="formRule._data.field" v-for="formRule in rule" :key="formRule._data.field">
              <Button type="success" @click="handleClickFormDel(formRule._data.field)">删除</Button>
              <formCreate :option="{submitBtn: false, form: {labelWidth: 80, labelPosition: 'right'}}" :ref="'fc' + formRule._data.field" :rule="[formRule]"/>

            </Cell>
          </CellGroup>
          
        </div>
        <div slot="right" class="demo-split-pane">
          <Tabs :animated="false">
            <TabPane label="标签一">
              <formCreate ref="fc2" :option="options" :rule="activeRule.length ? activeRule[0].form : []"/>
            </TabPane>
          </Tabs>
        </div>
      </Split>
    </Row>
    
  </div>
</template>

<script>
  import {
    maker
  } from '@form-create/iview'
  import {randomId} from 'utils'
  import mixin from './mixin.js'
  import {addForm} from 'service/form-service'
  export default {
    name: 'devlop_add_form',
    mixins: [mixin],
    data() {
      return {
        split1: 0.6,
        rule: [],
        options: {
          submitBtn: false,
          resetBtn: false
        },
        // 右边栏编辑区 
        editRule: [],
        // 根据选中不同的的表单从editRule中获取对应的编辑区 
        // 该数组的只能存在一个元素
        activeRule: [],
        formTag: [{
            key: '单行文本',
            type: 'input'
          },
          {
            key: '多行文本',
            type: 'textarea'
          },
          {
            key: '单选框',
            type: 'radio'
          },
          {
            key: '多选框',
            type: 'checkbox'
          },
          {
            key: '选择器',
            type: 'select'
          },
          {
            key: '日期时间选择器',
            type: 'datePicker'
          },
          {
            key: '上传文件',
            type: 'upload'
          },
        ],
        formData: {},
        actived: '',
        id: '',
        // 服务端所需表单数据
        form: {
          name: '',
          forms: ''
        }
      }
    },
    watch: {
      // 监听表单数组 
      rule(val) {
        // 一旦数组为空 清空右边栏编辑区
        if(!val.length) {
          console.log('dsada');
          
          // this.$refs.fc2.$f.destroy()
          this.radios = []
          this.editRule = []
          this.activeRule = []
          this.id = ''
          // this.$refs.fc2.$f.resetFields()
        }
      }
    },
    computed: {
      
    },
    
    methods: {
      // 生成form
      addFormDy(type) {
        this.$nextTick(() => {
          let $f = this.$refs.fc2.$f
          // 判断当前生成的表单项是否是radio的一种 如果是则显示添加按钮
          if(type !== 'radio' && type !== 'checkbox' && type !== 'select') $f.hidden(true, 'addBtn')
          else $f.hidden(false, 'addBtn')

          // 获取该表单data
          this.formData = $f.formData()
          let data = this.formData
          // 获取表单
          let form = this.getForm(type, data)
          // 添加
          this.rule.push(form)
        })
      },
      // 获取点击对应的form
      setActiveRule(key) {
        let arr = this.editRule
        if(!arr.length) return arr
        let filter = arr.filter(item => {
          return item.key === key
        })
        if(filter.length) this.activeRule = filter
        
      },
      // 删除表单
      handleClickFormDel(field) {
        this.$nextTick(() => {
          console.log(field);
          let $f = this.$refs[`fc${field}`][0].$f
          this.rule.some((item, i) => {
            if(item._data.field === field) {
              $f.removeField(field)
              this.rule.splice(i, 1)
              // if(!this.rule.length) $f.destroy()
              return true
            }
          })
          
        })
        

      },
      // 点击要生成的某一个表单项 单行文本
      handleClick(item) {
        let id = randomId(4)
        this.id = id
        // 缓存当前选中值
        this.actived = item.type
        this.$nextTick(() => {
          
          
          this.editRule.push(
            this.getFormActive(id, item.type)
          )
          this.setActiveRule(id)
          this.addFormDy(item.type)
        })
        
      },
      // 点击生成的某一个表单 切换到对应的表单项
      handleClickForm(key) {
        this.$nextTick(() => {
          let $f = this.$refs['fc' + key][0].$f
          // console.log(this.$refs['fc' + key]);
          // 获取当前点击的表单类型
          let type = $f.getRule(key).type
        
          this.actived = type
          this.setActiveRule(key)
        })
        
        
      },
      // getFormTypeInId(id) {
      //   this.rule
      // },
      bindModel(e, filed, id, key = '') {
        let val = e.target && e.target.value
        let $f = this.$refs['fc' + id][0].$f
        
        console.log('$f', $f);
        let update = {}
        // 说明是改某一个子集
        if(filed === 'options') {
          
          $f.model()[id].options.some(item => {
            if(item.labelKey === key) {
              item.label = val
              return true
            }
            if(item.valueKey === key) {
              item.value = val
              return true
            }
          })
          // update['options'] = [
          //   // {value: }
          // ]
          console.log($f.model());
          
          return
        }
        if(filed === 'placeholder' || filed === 'action') {
          update['props'] = { [filed]: val}
        }

        if(filed === 'required') {
          console.log('re', Boolean(e.length));
          
          update['validate'] = [{ [filed]: Boolean(e.length)}]
        }
        // 如果更改宽度
        if(filed == 'span'){
          update['col'] = {
            [filed]: parseInt(val)
          }
        }
       
        // 如果当前选中的表单为 多选框和选择器 需要把值放入数组中
        if(this.actived === ('checkbox' || 'select')) {
          console.log('jinlai');
          
          update[filed] = [val]
        }
        // 如果是日期 直接复制当前e参数
        if(this.actived === 'datePicker') {
          update[filed] = e
        }
        if(this.actived === 'upload') {
          update['props'] = {name: val}
        }
        // 反之正常赋值
         else update[filed] = val
        
        $f.updateRule(id, update)
          
      },

      getFormJson() {
        // 生成最终json
        let data = []
        this.rule.forEach((item) => {
          
          let $f = this.$refs['fc' + item.__field__][0].$f
          // 浅拷贝一份规则
          let o = Object.assign({}, $f.model()[item.__field__])
          // 将真实的字段名赋值
          o.field = o.filed
          data.push(o)
        })
        return JSON.stringify(data)
      },
      handleClickBtn() {
        if(!this.form.name) return this.$Message.warning('请填写表单自定义名')
        let forms = this.getFormJson()
        this.form.forms = forms
        // 发送至服务端
        addForm(this.form).then(res => {
          console.log(res);
          this.$Message.success(res)
        })
      }
    }
  }
</script>

<style lang="less">
  .form_edit_right {
    display: flex;
    justify-content: space-around;
    align-items:flex-start;
  }
  .form_edit_box {
    display: flex;
    width: 50%;
    justify-content: center;
  }
  .form_split {
    min-height: 100vh;
    width: 100%;
    border: 1px solid #dcdee2;
    
  }

  .demo-split-pane {
    padding: 10px;
    min-height: 100%;
    // background: #5cadff;
    
  }
  // 重置cell样式
  .ivu-cell-main {
    width: 100% !important;
  }
  .ivu-cell {
    overflow: visible;
  }
  .ivu-tabs {
    overflow: visible;
  }
</style>