<template>
  <div>
    <Table border :columns="columns" :data="data">
      <template slot-scope="{row, index}" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="handleBrandEdit(row, index)">编辑</Button>
        <Button v-if="row.brand_status ? false : true" type="error" size="small" @click="handleBrandRemove(row)">删除</Button>
      </template>
      <template slot-scope="{row, index}" slot="logo">
        <div v-viewer>
          <img width="100" height="100" :src="row.brand_logo" alt="">
        </div>
        
      </template>
      <template slot-scope="{row, index}" slot="status">
        <i-switch 
        disabled
        :value="row.brand_status ? false : true"
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
import {getBrand, removeBrand} from 'service/brand-service'
import mixin from 'utils/mixins'
export default {
  name: 'product_brand_list',
  mixins: [mixin],
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
          key: 'brand_name',
          title: '品牌名称'
        },
        {
          key: 'brand_url',
          title: '品牌网址'
        },
        {
          key: 'brand_logo',
          title: '品牌网址',
          slot: 'logo'
        },
        {
          key: 'brand_des',
          title: '品牌描述'
        },
        {
          key: 'brand_status',
          title: '品牌状态',
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
    this.loadBrandList({})
  },
  methods: {
    loadBrandList(data) {
      getBrand(data).then(res => this.data = res.data)
    },
    // 编辑品牌
    handleBrandEdit(row, i) {
      // TODO 
    },
    // 删除品牌
    handleBrandRemove(row) {
      this.modalInstance('warning', '您确定要删除该品牌吗？', () => {
        removeBrand({id: row.id}).then(res => {
          this.$Message.success('删除成功', 1500)
          this.loadBrandList({})
        })
      })
      
    }
  }
}
</script>

<style>

</style>