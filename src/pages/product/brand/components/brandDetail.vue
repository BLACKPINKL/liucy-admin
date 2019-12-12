<template>
  <div>
    <formCreate ref="fc" :rule="rule" :option="option" />

  </div>
</template>

<script>
  //获取生成器
  import {
    maker
  } from '@form-create/iview'
  import {
    getForm
  } from 'service/form-service'
  import {
    addBrand,
    getBrandById,
    updateBrand
  } from 'service/brand-service'
  export default {
    name: 'product_brand_detail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        rule: [],
        option: {
          // 获取表单数据
          onSubmit: (data) => {
            // 处理图片数组
            data.brand_logo = data.brand_logo[0]
            // 提交服务端 判断是否为编辑
            if(!this.isEdit) this.handleAddBrand(data)
            else {
              // 更新
              data.id = this.id
              this.handleUpdateBrand(data)
            }
          }
        },
        // 当前url的id值
        id: ''
      }
    },
    created() {
      this.loadForms({
        name: 'add_brand'
      })
    },
    methods: {
      // 加载表单
      loadForms(data) {
        getForm(data).then(res => {
          this.rule = res.data.forms
          if (this.isEdit === true) this.loadFormsByEdit()
        })
      },
      // 添加品牌
      handleAddBrand(data) {
        addBrand(data).then(res => {
          this.$Message.success('添加成功', 1500)
          this.loadForms({
            name: 'add_brand'
          })
        })
      },
      // 更新
      handleUpdateBrand(data) {
        updateBrand(data).then(res => {
          this.$Message.success('更新成功', 1500)
          this.loadForms({
            name: 'add_brand'
          })
        })
      },

      // 编辑回显
      loadFormsByEdit() {
        
        // 获取id
        let id = this.$route.params && this.$route.params.id
        this.id = id
        // 获取表单组件
        let $f = this.$refs.fc.$f
        getBrandById({id}).then(res => {
          console.log(res);
          // 更新value
          $f.setValue(res.data)
        })
      }
    }
  }
</script>

<style lang="less" scoped>

</style>