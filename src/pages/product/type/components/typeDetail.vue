<template>
  <div>
    <formCreate ref="fc" :rule="rule" :option="option" />
  </div>
</template>

<script>
import commonMixin from 'utils/mixins'
import mixin from 'pages/article/components/mixins'
import {changeStr} from 'utils'
import {addType, getTypeList, getTypeById, updateType} from 'service/type-service'
export default {
  name: 'type_detail',
  mixins: [commonMixin, mixin],
  props: {
    isEdit: {        
      type: Boolean,
      default: false
    }
  },
  created() {
    
    this.loadTypeList()
  },
  data() {
    return {
      id: '',
      option: {
          // 获取表单数据
        onSubmit: (data) => {
          // // 提交服务端 判断是否为编辑
          if(!this.isEdit){
            this.handleAddType(data)
          }
          else {
            // 更新
            data.id = this.id
            this.handleUpdateType(data)
          }
          console.log(data);
          
        }
      }
    }
  },
  methods: {
    handleLoadForm() {
      return this.loadForms('add_type')
    },
    loadTypeList() {
      
      getTypeList({}).then(res => {
        return this.handleLoadForm().then(forms => {
          return res
        })
      })
      .then(res2 => {
        if(this.isEdit) this.loadTypeById()
      })
    },
    // 编辑回显
    loadTypeById() {
      
      // 获取id
      let id = this.$route.params && this.$route.params.id
      this.id = id
      // 获取表单组件
      let $f = this.$refs.fc.$f
      getTypeById({id}).then(res => {
        console.log(res);
        // 更新value
        $f.setValue(changeStr(res.data))
      })
    },
    // 更新商品类型
    handleUpdateType(data) {
      updateType(data).then(res => {
        this.$Message.success('更新成功', 1500)
        this.loadTypeList()
      })
    },
    // 添加商品类型
    handleAddType(data) {
      addType(data).then(res => {
        this.$Message.success('添加成功', 1500)
        this.handleLoadForm()
      })
    },
  },
}
</script>

<style>

</style>