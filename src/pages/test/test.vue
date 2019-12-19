<template>
  <div>
    <formCreate ref="fc" :rule="rule" :option="option"></formCreate>
    <div v-html="html"></div>
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
      rule: [],
      
      html: ''
    }
  },
  mounted() {
    this.html = this.HTMLDecode('&lt;h1&gt;gfb&lt;span style=font-weight: bold;&gt;gfbgfbfgb&lt;/span&gt;&lt;/h1&gt;')
    console.log();
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
  },
  methods: {
    HTMLDecode(text) { 
      var temp = document.createElement("div"); 
      temp.innerHTML = text; 
      var output = temp.innerText || temp.textContent; 
      temp.remove()
      return output; 
    }
  },  
}
</script>

<style>

</style>