<template>
  <div>
    <Modal
    v-model="show"
    :title="title"
    :ok-text="okText"
    :width="width"
    :loading="loading"
    @on-ok="handlePraSubmit"
    >
      <Form ref="valiFormPra" :model="forms" :label-width="100">
        <FormItem 
        :label="item.label" 
        v-for="(item,index) in forms.items" 
        :key="index"
        :prop="'items.' + index  + '.value'"
        :rules="item.type === 'checkbox' ? {required: item.required || false, message: '此项为必填项', trigger: 'change', type: 'array'} : {required: item.required || false, message: '此项为必填项', trigger: 'blur'}">
          <Row>
            <Col :span="formSpan">
              <template v-if="item.type === 'input'">
                <Input 
                size="large" 
                v-model="item.value" 
                :type="item.inputType || 'text'"
                :placeholder="item.required ? `请填写${item.label}` : '选填'"
                :disabled="item.disabled || false"/>
              </template>
              <template v-if="item.type === 'radio'">
                <RadioGroup v-model="item.value">
                  <Radio 
                  v-for="radio in item.radios" 
                  :key="radio.value" 
                  :label="radio.value">{{radio.label}}</Radio>
                </RadioGroup>  
              </template>
              <template v-if="item.type === 'checkbox'">
                <CheckboxGroup v-model="item.value">
                  <Checkbox 
                  v-for="checkbox in item.checkboxs" 
                  :key="checkbox.value" 
                  :label="checkbox.value">
                  {{checkbox.label}}
                  </Checkbox>
                </CheckboxGroup>
              </template>
            </Col>
            
          </Row>
        </FormItem>
        
      </Form>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'formModal',
    props: {
      forms: {
        type: Object,
        default: () => ({})
      },
      title: {
        type: String,
        default: ''
      },
      okText: {
        type: String,
        default: '提交'
      },
      width: {
        type: String,
        default: '520'
      },
      formSpan: {
        type: Number,
        default: 20
      }
    },
    data() {
      return {
        show: false,
        loading: true
      }
    },
    
    methods: {
      // 提交
      handlePraSubmit() {
        this.$refs.valiFormPra.validate((vali) => {
          if(!vali){
            this.loading = false
            this.$Message.warning('表单填写不完整')
       
            return
          }
          // 点击提交 通知父组件 抛出表单
          let o = {}
          this.forms.items.forEach(form => {
            o[form.key] = form.value
          })
          this.$emit('handleModalSubmit', o)
        })
        
      },
      showModal() {
        this.show = true
      },
      hideModal() {
        this.show = false
      },
    }
  }
</script>

<style lang="less" scoped>

</style>