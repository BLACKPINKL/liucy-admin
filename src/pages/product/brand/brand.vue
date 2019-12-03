<template>
  <div>
    <Button type="warning" @click="handleClickDel">删除</Button>
    品牌添加
    <formCreate  ref="fc" :rule="rule" :option="option"/>

  </div>
</template>

<script>
//获取生成器
import { maker } from '@form-create/iview'
export default {
  name: 'product_brand',
  
  data() {
    return {
      rule:[
       maker.input('商品名称', 'goods_name', 'iphone').props({
          placeholder: '请输入商品名称'
        }).col({
          // 总24 默认50%
          span: 12,
          labelWidth: 80
        }).validate([{
          required: true,
          message: '请输入商品名称',
          trigger: 'blur'
        }]).event({
          change: console.log
        }).emit(['change']),
        {
          type:'datePicker',
          field:'created_at',
          title:'创建时间'
        },
        maker.checkbox('是否必填', 'required',[false]).options([
          {value: true, label: ''}
        ]) 
     ],
     option:{
       //表单提交事件
       onSubmit:function (formData) {
         console.log(formData);
         
       }
     }
    }
  },
  mounted() {
    // let maker = maker.input('field','title','value',{disabled:true})
    // console.log(maker);
    
  },
  methods: {
    handleClickDel() {
      const $f = this.$refs.fc.$f
         let rule =$f.removeField('created_at')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>