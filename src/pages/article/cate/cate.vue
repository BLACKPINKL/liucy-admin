<template>
  <div>
    <formCreate ref="fc" :rule="rule" :option="option"></formCreate>
  </div>
</template>

<script>
import mixin from 'utils/mixins'
import {addCate, getCate} from 'service/cate-service'
export default {
  name: 'article_cate',
  mixins: [mixin],
  data() {
    return {
      option: {
        onSubmit:(data) => {
          console.log(data);
          addCate(data).then(res => this.msg('success', '添加成功'))
        }
      }
    }
  },
  created() {
    this.loadCateList()
    
  },
  methods: {
    loadCateList() {
      getCate({}).then(res => {
        return this.loadForms('add_cate').then(forms => {
          return res
        })
      }).then(res2 => {
        let $f = this.$refs.fc.$f
        let options = [
          {
            label: '顶级分类',
            value: '0'
          }
        ]
        res2.data.forEach(item => {
          options.push({
            label: item.cate_name,
            value: item.id
          })
        })
        $f.updateRule('pid', {
          options
        })
      })
    }
  }
}
</script>

<style>

</style>