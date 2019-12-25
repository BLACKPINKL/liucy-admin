<template>
  <div>
    <Tabs>
      <TabPane label="标签一">标签一的内容</TabPane>
      <TabPane label="标签二" disabled>标签二的内容</TabPane>
      <TabPane label="标签三">标签三的内容</TabPane>
    </Tabs>
    <!-- <formCreate ref="fc" :rule="rule" :option="option" /> -->
  </div>
</template>

<script>
import commonMixin from 'utils/mixins'
import mixin from 'pages/article/components/mixins'
import {changeStr} from 'utils'
import {addGoods, getGoodsList, getGoodsById, updateGoods} from 'service/goods-service'
export default {
  name: 'goods_detail',
  mixins: [commonMixin, mixin],
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  created() {
    // this.loadGoodsList()
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
            this.handleAddGoods(data)
          }
          else {
            // 更新
            data.id = this.id
            this.handleUpdateGoods(data)
          }
          console.log(data);
          
        }
      }
    }
  },
  methods: {
    // 编辑回显
    loadGoodsById() {
      
      // 获取id
      let id = this.$route.params && this.$route.params.id
      this.id = id
      // 获取表单组件
      let $f = this.$refs.fc.$f
      getGoodsById({id}).then(res => {
        console.log(res);
        
        // 更新value
        $f.setValue(changeStr(res.data))
      })
    },
    loadGoodsList() {
      
      getGoodsList({}).then(res => {
        return this.loadForms('add_Goods').then(forms => {
          return res
        })
      })
      .then(res2 => {
       // 如果当前是编辑 
        if(this.isEdit) this.loadGoodsById()
        this.addOptions({field: 'pid', labelKey: 'cate_name', valueKey: 'id'}, res2.data)

        
      })
    },
    // 更新商品分类
    handleUpdateGoods(data) {
      updateGoods(data).then(res => {
        this.$Message.success('更新成功', 1500)
        this.loadForms({
          name: 'add_Goods'
        })
      })
    },
    // 添加商品分类
    handleAddGoods(data) {
      addGoods(data).then(res => {
        this.$Message.success('添加成功', 1500)
        this.loadForms({
          name: 'add_Goods'
        })
      })
    },
  },
}
</script>

<style>

</style>