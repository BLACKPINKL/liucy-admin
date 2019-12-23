<template>
  <div>
    <Table border :columns="columns" :data="data">
      <template slot-scope="{row, index}" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="handleCategoryEdit(row, index)">编辑</Button>
        <Button v-if="!row.delete_time" type="error" size="small" @click="handleCategoryRemove(row)">删除</Button>
        <Button v-else type="error" size="small" @click="handleCategoryRecover(row)">恢复</Button>
      </template>
      <template slot-scope="{row}" slot="img">
        <div v-viewer style="cursor: pointer">
          <img width="100" height="100" :src="row.cate_img" alt="">
        </div>
        
      </template>
      <template slot-scope="{row}" slot="status">
        <i-switch 
          disabled
          :value="row.delete_time ? false : true"
          size="large"
          true-color="#13ce66" 
          false-color="#ff4949">
          <span slot="open">显示</span>
          <span slot="close">隐藏</span>
        </i-switch>
      </template>
    </Table>
  </div>
</template>

<script>
import Vue from 'vue'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'

Vue.use(Viewer)
import {getCategoryList, removeCategory, recoverCategory} from 'service/category-service'
import commonMixin from 'utils/mixins'
export default {
  name: 'category_list',
  mixins: [commonMixin],
  data() {
    return {
      switchShow: true,
      data: [],
      columns: [
        {
          key: 'id',
          title: 'ID'
        },
        {
          key: 'cate_name',
          title: '商品分类名称'
        },
        
        {
          key: 'cate_img',
          title: '缩略图',
          slot: 'img'
        },
        
        {
          key: 'delete_time',
          title: '商品分类状态',
          slot: 'status'
        },
        {
          align: 'center',
          title: '操作',
          slot: 'action'
        },
      ]
    }
  },
  mounted() {
    this.loadCategoryList({})
  },
  methods: {
    loadCategoryList(data) {
      getCategoryList(data).then(res => this.data = res.data)
    },
    // 编辑品牌
    handleCategoryEdit(row, i) {
      // TODO 
      this.$router.push({path: `/category/edit/${row.id}`})
    },
    // 删除品牌
    handleCategoryRemove(row) {
      this.modalInstance('warning', '您确定要删除该品牌吗？', () => {
        removeCategory({id: row.id}).then(res => {
          this.$Message.success('删除成功', 1500)
          this.loadCategoryList({})
        })
      })
      
    },
    // 恢复删除
    handleCategoryRecover(row) {
      this.modalInstance('warning', '您确定要恢复该品牌吗？', () => {
        recoverCategory({id: row.id}).then(res => {
          this.$Message.success('恢复成功', 1500)
          this.loadCategoryList({})
        })
      })
    }
  }
}
</script>

<style>

</style>