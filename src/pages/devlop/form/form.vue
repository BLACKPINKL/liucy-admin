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
              <formCreate ref="fc" :rule="[formRule]"/>
            </Cell>
          </CellGroup>
          
        </div>
        <div slot="right" class="demo-split-pane">
          <Tabs :animated="false">
            <TabPane label="标签一">
              <formCreate v-model="rule2Model" ref="fc2" :option="options" :rule="activeRule.length ? activeRule[0].form : []"/>
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
  import mixin from 'mixin'
  export default {
    name: 'devlop_form',
    mixins: [mixin],
    data() {
      return {
        split1: 0.6,
        rule: [],
        options: {
          onSubmit: (formData) => {
            console.log(formData);
            
            this.formData = formData
            this.addFormDy(this.selectType)
          },
        },
        editRule: [],
        activeRule: [],
        rule2Model: {},
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
        selectType: 'input'
      }
    },
    computed: {
      
    },
    methods: {
      addFormDy(type) {
        let data = this.formData
        let form = this.getForm(type, data)
        this.rule = form
      },
      setActiveRule(key) {
        let arr = this.editRule
        if(!arr.length) return arr
        let filter = arr.filter(item => {
          console.log(item);
          
          return item.key === key
        })
        console.log(key, filter);
        
        this.activeRule = filter
      },
      // 点击要生成的某一个表单项 单行文本
      handleClick(item) {
        let id = randomId(4)
        this.editRule.push(
          {
            key: id,
            form: [
              maker.input('字段名', 'filed-' + id, id),
              maker.input('label', 'label-' + id, item.key),
              maker.input('宽度', 'width-' + id, '50%'),
              maker.input('默认值', 'value-' + id, '默认值'),
            ]
          }
        )
        
        this.setActiveRule(id)
        this.selectType = item.type
      },
      // 点击生成的某一个表单
      handleClickForm(key) {
        // console.log(this.editRule);
        
        this.setActiveRule(key)
        
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