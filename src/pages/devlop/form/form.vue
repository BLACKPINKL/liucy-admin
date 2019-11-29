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
      }
    },
    computed: {
      
    },
    methods: {
      addFormDy(type) {
        let $f = this.$refs.fc2.$f
        console.log(this.$refs.fc2);
        
        this.$nextTick(() => {
          this.formData = $f.formData()
          let data = this.formData
          let form = this.getForm(type, data)
          this.rule.push(form)
        })
        
        
      },
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

        let id = randomId(4)
        let that = this
        that.editRule.push(
          {
            key: id,
            form: [
              maker.input('字段名', 'filed-' + id, id).event({
                change(e) {
                  that.bindModel(e, 'filed-' + id, id)
                  
                }
              }),
              maker.input('label', 'label-' + id, item.key).event({
                change(e) {
                  that.bindModel(e, 'label-' + id, id)
                  
                }
              }),
              maker.input('宽度', 'width-' + id, '50%').event({
                change(e) {
                  that.bindModel(e, 'width-' + id, id)
                  
                }
              }),
              maker.input('默认值', 'value-' + id, '默认值').event({
                change(e) {
                  that.bindModel(e, 'value-' + id, id)
                  
                }
              }),
            ]
          }
        )
        
        this.setActiveRule(id)
        this.addFormDy(item.type)
      },
      // 点击生成的某一个表单 切换到对应的表单项
      handleClickForm(key) {
        this.setActiveRule(key)
        
      },
      bindModel(e, filed, id) {
          let val = e.target.value
          let $f = this.$refs['fc' + id][0].$f
          // $f.updateRule(id, {
          //   value: val,
          //   filed: val
          // })

        
        // this.rule.some(item => {
        //   console.log(item._data.value);
          
        // })
        // $f.setValue(id, e.target.value)
      },


      handleClickBtn() {
      console.log(this.rule);
      
        
      }
    }
  }
</script>

<style lang="less" scoped>
  .form_split {
    height: 800px;
    border: 1px solid #dcdee2;
    background: #5cadff;
  }

  .demo-split-pane {
    padding: 10px;
    
  }
</style>