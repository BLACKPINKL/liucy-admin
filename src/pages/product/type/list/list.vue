<template>
  <div>
    <Table border :columns="columns" :data="data">
      <template slot-scope="{row, index}" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="handleAttrList(row, index)">属性</Button>
        <Button type="primary" size="small" style="margin-right: 5px" @click="handleTypeEdit(row, index)">编辑</Button>
        
        <Button v-if="!row.delete_time" type="error" size="small" @click="handleTypeRemove(row)">删除</Button>
        <Button v-else type="error" size="small" @click="handleTypeRecover(row)">恢复</Button>
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
import {getTypeList, removeType, recoverType} from 'service/type-service'
import commonMixin from 'utils/mixins'
export default {
  name: 'type_list',
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
          key: 'type_name',
          title: '商品类型名称'
        },
        
        {
          key: 'delete_time',
          title: '商品类型状态',
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
    this.loadTypeList({})
  },
  methods: {
    loadTypeList(data) {
      getTypeList(data).then(res => this.data = res.data)
    },
    // 编辑品牌
    handleTypeEdit(row, i) {
      // TODO 
      this.$router.push({path: `/type/edit/${row.id}`})
    },
    // 删除品牌
    handleTypeRemove(row) {
      this.modalInstance('warning', '您确定要删除该品牌吗？', () => {
        removeType({id: row.id}).then(res => {
          this.$Message.success('删除成功', 1500)
          this.loadTypeList({})
        })
      })
      
    },
    // 恢复删除
    handleTypeRecover(row) {
      this.modalInstance('warning', '您确定要恢复该品牌吗？', () => {
        recoverType({id: row.id}).then(res => {
          this.$Message.success('恢复成功', 1500)
          this.loadTypeList({})
        })
      })
    },
    handleAttrList(row) {
      //TODO
      this.$router.push({name: 'product_attr_list', params: {
        id: row.id
      }})
    }
  }
}
</script>

<style>

</style>