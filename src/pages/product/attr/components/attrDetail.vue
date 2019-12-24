<template>
  <div>
    <formCreate ref="fc" :rule="rule" :option="option" />
  </div>
</template>

<script>
import commonMixin from 'utils/mixins'
import mixin from 'pages/article/components/mixins'
import {changeStr} from 'utils'
import {getTypeList} from 'service/type-service'
import {addAttr, getAttrList, getAttrById, updateAttr} from 'service/attr-service'
export default {
  name: 'attr_detail',
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
          // 将逗号转换全英文符
          let values = data.attr_values
          data.attr_values = values.replace(/\，/ig, ',')
          // // 提交服务端 判断是否为编辑
          if(!this.isEdit){
            this.handleAddAttr(data)
          }
          else {
            // 更新
            data.id = this.id
            this.handleUpdateAttr(data)
          }
          console.log(data);
          
        }
      }
    }
  },
  methods: {
    loadTypeList() {
      getTypeList({}).then(typeData => {
        return typeData
      })
      .then(res => {
        this.loadForms('add_attr').then(forms => {
          console.log(res);
          
          this.addOptions({field: 'type_id', labelKey: 'type_name', valueKey: 'id'}, res.data)
          
          if(this.isEdit) this.loadAttrById()
        })
      })
      
    },
    // 编辑回显
    loadAttrById() {
      
      // 获取id
      let id = this.$route.params && this.$route.params.id
      this.id = id
      // 获取表单组件
      let $f = this.$refs.fc.$f
      getAttrById({id}).then(res => {
        console.log(res);
        // 更新value
        $f.setValue(changeStr(res.data))
      })
    },
    // 更新商品类型
    handleUpdateAttr(data) {
      updateAttr(data).then(res => {
        this.$Message.success('更新成功', 1500)
        this.loadAttrList()
      })
    },
    // 添加商品类型
    handleAddAttr(data) {
      addAttr(data).then(res => {
        this.$Message.success('添加成功', 1500)
        this.loadTypeList()
      })
    },
  },
}
</script>

<style>

</style>