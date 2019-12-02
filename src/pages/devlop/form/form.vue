<template>
  <div>
    <Row>
      <Col :span="Math.ceil(24 / formTag.length)" v-for="item in formTag" :key="item.key">
      <Tag @click.native="handleClick(item)" color="primary">{{item.key}}</Tag>
      </Col>
    </Row>
    <Row class="form_split">

      <Split v-model="split1" >
        <div slot="left" class="demo-split-pane">
          <CellGroup @on-click="handleClickForm">
            <Cell title="" :name="formRule._data.field" v-for="formRule in rule" :key="formRule._data.field">
              <formCreate :option="{submitBtn: false}" :ref="'fc' + formRule._data.field" :rule="[formRule]"/>
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
    <Row>
      <Col>
      <Button type="primary" @click="handleClickBtn">
        阿萨德
      </Button>
      </Col>
    </Row>
  </div>
</template>

<script>
  import {
    maker
  } from '@form-create/iview'
  import {randomId} from 'utils'
  import mixin from './mixin.js'
  export default {
    name: 'devlop_form',
    mixins: [mixin],
    data() {
      return {
        split1: 0.6,
        rule: [],
        options: {
          submitBtn: false,
          resetBtn: false
        },
        editRule: [],
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
            type: 'textarea'
          },
          {
            key: '选择器',
            type: 'select'
          },
          {
            key: '日期时间选择器',
            type: 'DatePicker'
          },
        ],
        formData: {},
        i: 1,
        id: '',
        f: null
      }
    },
    computed: {
      
    },
    watch: {
      rule(val) {
        this.$nextTick(() => {
          this.f = this.$refs['fc' + this.id][0].$f
        })
      }
    },
    methods: {
      // 生成form
      addFormDy(type) {
        let $f = this.$refs.fc2.$f
        
        this.$nextTick(() => {
          this.formData = $f.formData()
          let data = this.formData
          let form = this.getForm(type, data)
          this.rule.push(form)
          
          
          // this.f = this.$refs['fc' + this.id][0].$f
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
      // 点击要生成的某一个表单项 单行文本
      handleClick(item) {
        let that = this
        let id = randomId(4)
        this.id = id
        
        this.$nextTick(() => {
          that.editRule.push(
            that.getFormActive(id, item.type)
          )
          this.setActiveRule(id)
          this.addFormDy(item.type)
        })
        
      },
      // 点击生成的某一个表单 切换到对应的表单项
      handleClickForm(key) {
        this.setActiveRule(key)
        
      },
      bindModel(e, filed, id, key) {
        let val = e.target.value
        let $f = this.$refs['fc' + id][0].$f
        
        console.log('$f', e);
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
        // 如果更改宽度
        if(filed == 'span'){
          update['col'] = {
            span: parseInt(val)
          }
        }
        else update[filed] = val
        
        $f.updateRule(id, update)
          
      },


      handleClickBtn() {
        console.log(this.rule);
        
        this.formData['value-' + this.id] = this.i
        
      }
    }
  }
</script>

<style lang="less">
  .form_split {
    height: 800px;
    width: 100%;
    border: 1px solid #dcdee2;
    background: #5cadff;
  }

  .demo-split-pane {
    padding: 10px;
    
  }
  // 重置cell样式
  .ivu-cell-main {
    width: 100% !important;
  }
</style>