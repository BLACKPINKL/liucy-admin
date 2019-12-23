<template>
  <div>
    <formCreate ref="fc" :rule="rule" :option="option" />
  </div>
</template>

<script>
import commonMixin from 'utils/mixins'
import mixin from 'pages/article/components/mixins'
import {changeStr} from 'utils'
import {addCategory, getCategoryList, getCategoryById, updateCategory} from 'service/category-service'
export default {
  name: 'category_detail',
  mixins: [commonMixin, mixin],
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.loadCategoryList()
  },
  data() {
    return {
      id: '',
      option: {
          // 获取表单数据
        onSubmit: (data) => {
          // 处理图片数组
          data.cate_img = data.cate_img[0]
          // // 提交服务端 判断是否为编辑
          if(!this.isEdit){
            this.handleAddCategory(data)
          }
          else {
            // 更新
            data.id = this.id
            this.handleUpdateCategory(data)
          }
          console.log(data);
          
        }
      }
    }
  },
  methods: {
    // 编辑回显
    loadCategoryById() {
      
      // 获取id
      let id = this.$route.params && this.$route.params.id
      this.id = id
      // 获取表单组件
      let $f = this.$refs.fc.$f
      getCategoryById({id}).then(res => {
        console.log(res);
        
        // 更新value
        $f.setValue(changeStr(res.data))
      })
    },
    loadCategoryList() {
      
      getCategoryList({}).then(res => {
        return this.loadForms('add_category').then(forms => {
          return res
        })
      })
      .then(res2 => {
       // 如果当前是编辑 
        if(this.isEdit) this.loadCategoryById()
        this.addOptions(res2, 'pid')

        
      })
    },
    // 更新商品分类
    handleUpdateCategory(data) {
      updateCategory(data).then(res => {
        this.$Message.success('更新成功', 1500)
        this.loadForms({
          name: 'add_category'
        })
      })
    },
    // 添加商品分类
    handleAddCategory(data) {
      addCategory(data).then(res => {
        this.$Message.success('添加成功', 1500)
        this.loadForms({
          name: 'add_category'
        })
      })
    },
  },
}
</script>

<style>

</style>