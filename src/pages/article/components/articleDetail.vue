<template>
  <div>
    <formCreate ref="fc" :rule="rule" :option="option"></formCreate>
    <Editor required labelWidth="125" label="文章内容"></Editor>
    <Button type="primary" long @click="handleClickSubmit">提交</Button>
  </div>
  
</template>

<script>
import {getArticles, addArticle} from 'service/article-service'
import mixin from 'utils/mixins'
import Editor from 'components/editor'
  import {
    maker
  } from '@form-create/iview'
export default {
  name: 'articleDetail',
  components: {
    Editor
  },
  mixins: [mixin],
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 当前url参数
      id: '',
      option: {
        submitBtn: false,
      }
    }
  },
  created() {
    // this.loadArticleList()
    this.loadForms('add_article')
    
  },
 
  methods: {
    // 表单提交
    handleClickSubmit() {
      let $f = this.$refs.fc.$f
      let data = $f.formData()
      console.log(data)
      // TODO
    },
    // 编辑回显
    loadArticleById() {

    }
  },
}
</script>

<style>

</style>