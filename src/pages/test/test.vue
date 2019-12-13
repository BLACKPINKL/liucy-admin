<template>
  <div>
    <formCreate ref="fc" :rule="rule" :option="option"></formCreate>
  </div>
</template>

<script>
import mixin from 'utils/mixins'
import {maker} from '@form-create/iview'
export default {
  name: 'test',
  mixins: [mixin],
  data() {
    return {
      option: {
        onSubmit: (data) => {
          console.log(data);
          
        }
      },
      rule: []
    }
  },
  mounted() {
    console.log('asdasd');
    // this.rule = [
    //     {
    //       type: 'select',
    //       value: ['104'],
    //       title: '产品',
    //       options: [
    //         {
    //           "value": "104",
    //           "label": "生态蔬菜",
    //           // "disabled": false
    //         },
    //         {
    //           "value": "105",
    //           "label": "新鲜水果",
    //           // "disabled": false
    //         },
    //       ],
    //       field: 'cate'
    //     }
        
    //   ]
    this.loadForms('test').then(res => {
      // res.data.forms[0].field = 'cate'
      this.rule = res.data.forms
      
      
      // this.rule = [
      //   {
      //     type: 'select',
      //     value: ['104'],
      //     title: '产品',
      //     options: [
      //       {
      //         "value": "104",
      //         "label": "生态蔬菜",
      //         // "disabled": false
      //       },
      //       {
      //         "value": "105",
      //         "label": "新鲜水果",
      //         // "disabled": false
      //       },
      //     ],
      //     field: 'cate'
      //   }
        
      // ]
      // console.log(res.data.forms, this.rule);
    })
  }
}
</script>

<style>

</style>