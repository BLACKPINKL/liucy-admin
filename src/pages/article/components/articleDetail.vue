<template>
  <div>
    <formCreate ref="fc" :rule="rule" :option="option"></formCreate>
    <Editor ref="editor" v-model="html" required labelWidth="125" label="文章内容"></Editor>
    <Button type="primary" long @click="handleClickSubmit">提交</Button>
  </div>
  
</template>

<script>
import {getArticles, addArticle} from 'service/article-service'
import {getCate} from 'service/cate-service'
import commonMixin from 'utils/mixins'
import Editor from 'components/editor'
import {maker} from '@form-create/iview'
import mixin from 'pages/article/components/mixins'
export default {
  name: 'articleDetail',
  components: {
    Editor
  },
  mixins: [mixin, commonMixin],
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
      },
      // 富文本编辑器 value
      html: ''
    }
  },
  created() {
    this.loadCateList()
    
  },
  methods: {
    // 表单提交
    handleClickSubmit() {
      let $f = this.$refs.fc.$f
      $f.validate((valid) => {
        if(!valid) return 
        if(!this.html) return this.$refs.editor.showErrTip()

        // 验证通过
        let data = $f.formData()
        data.content = this.html
        this.handleAddArticle(data)
      })
    },
    // 添加
    handleAddArticle(data) {
      addArticle(data).then(res => {
        this.msg('success', '添加成功')
      })
    },
    // 加载分类列表
    loadCateList() {
      getCate({}).then(res => {
        return this.loadForms('add_article').then(forms => {
          return res
        })
      }).then(res2 => {
       // 如果当前是编辑 
        // if(this.isEdit) this.loadCateById()
        this.addOptions(res2, 'cate_id', [1, 2])

        
      })
    },
    // 编辑回显
    loadArticleById() {

    }
  },
}
</script>

<style>

</style>