<template>
  <div>
    <formCreate ref="fc" :rule="rule" :option="option"></formCreate>
  </div>
</template>

<script>
import commonMixin from 'utils/mixins'
import mixin from 'pages/article/components/mixins'
import {changeStr} from 'utils'
import {addCate, getCate, getCateById, updateCateById} from 'service/cate-service'
export default {
  name: 'article_cate',
  mixins: [commonMixin, mixin],
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
        onSubmit:(data) => {
          console.log(data);
          if(!this.isEdit) this.handleAddCate(data)
          else{
            data.id = this.id
            this.handleUpdateCate(data)
          }
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
       // 如果当前是编辑 
        if(this.isEdit) this.loadCateById()
        this.addOptions(res2, 'pid')

        
      })
    },
    // 添加分类
    handleAddCate(data) {
      addCate(data).then(res =>{
        this.msg('success', '添加成功')
        this.loadCateList()
      })
    },
    // 更新分类
    handleUpdateCate(data) {
      updateCateById(data).then(res => {
        this.msg('success', '更新成功')
        this.loadCateList()
      })
    },
    
    // 编辑数据
    loadCateById() {
      let id = this.$route.params && this.$route.params.id
      this.id = id
      // 获取表单组件
      let $f = this.$refs.fc.$f
      getCateById({id}).then(res => {
        console.log(res);
        // 处理表单组件bug value必须是string
        let o = changeStr(res.data)
        // 更新value
        $f.setValue(o)
      })
    } 
  }
}
</script>

<style>

</style>