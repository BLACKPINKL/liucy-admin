<template>
  <div>
    <formCreate  ref="fc" :rule="rule" :option="option"/>

  </div>
</template>

<script>
//获取生成器
import { maker } from '@form-create/iview'
import {getForm} from 'service/form-service'
import {addBrand} from 'service/brand-service'
export default {
  name: 'product_brand_add',
  
  data() {
    return {
      rule: [],
      option: {
        // 获取表单数据
        onSubmit:(data) => {
          // 处理图片数组
          data.brand_logo = data.brand_logo[0]
          // 提交服务端
          addBrand(data).then(res => {
            this.$Message.success('添加成功', 1500)
            this.loadForms({name: 'add_brand'})
          })
        }
     },
    }
  },
  mounted() {
    
    this.loadForms({name: 'add_brand'})
  },
  methods: {
    // 加载表单
    loadForms(data) {
      getForm(data).then(res => {
        this.rule = res.data.forms
      })
    }
    
  }
}
</script>

<style lang="less" scoped>

</style>