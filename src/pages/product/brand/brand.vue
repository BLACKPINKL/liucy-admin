<template>
  <div>
    <Button type="warning" @click="handleClickDel">删除</Button>
    <Button type="warning" @click="handleClickGetForm">获取</Button>
    <Button type="warning" @click="handleClickUpdateForm">修改</Button>
    品牌添加
    <formCreate  ref="fc" :rule="rule" :option="option"/>

  </div>
</template>

<script>
//获取生成器
import { maker } from '@form-create/iview'
import {getForm} from 'service/form-service'
export default {
  name: 'product_brand',
  
  data() {
    return {
      rule:[
        maker.input('商品名称', 'goods_name', 'iphone').props({
          placeholder: '请输入商品名称',
          width: 300
        })
     ],
     option:{
       //表单提交事件
       onSubmit:function (formData) {
         console.log(formData);
         
       }
     },
     i: 1
    }
  },
  mounted() {
    // let maker = maker.input('field','title','value',{disabled:true})
    // console.log(maker);
    
  },
  methods: {
    handleClickUpdateForm() {
      let field = (++this.i) + 'abc'
      
      // console.log(field);
      
      let $f = this.$refs.fc.$f
      
      $f.updateRule('goods_name', {field})

      this.$nextTick(() => {
        this.oldField = field
        this.rule.forEach((item, i) => {
          console.log(item._data.field, field);
          
          if(item._data.field === field) {
            console.log('进来');
            
            $f.reload()
            // this.rule[i] = 
          }
        })
       
        console.log(this.rule);
      })
      
      
    },
    handleClickDel() {
      const $f = this.$refs.fc.$f
      let rule =$f.removeField('created_at')
    },
    // 解析json格式并返回数据
    getRule(res) {
      let data = []
      res.forms.forEach(item => {
        // console.log();
        
        data = data.concat(...JSON.parse(item.data))
      })
      return data
    },
    handleClickGetForm() {
      getForm({name: 'test2'}).then(res => {
       
        this.rule = this.getRule(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>