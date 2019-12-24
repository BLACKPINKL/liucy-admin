<template>
  <div>
    <Table border :columns="columns" :data="data">
      <template slot-scope="{row, index}" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="handleAttrEdit(row, index)">编辑</Button>
        
        <Button v-if="!row.delete_time" type="error" size="small" @click="handleAttrRemove(row)">删除</Button>
        <Button v-else type="error" size="small" @click="handleAttrRecover(row)">恢复</Button>
      </template>
      
      <template slot-scope="{row}" slot="type">
        <Tag color="primary">{{getAttrType(row.attr_type)}}</Tag>
      </template>
      <template slot-scope="{row}" slot="type_id">
        {{row.type.type_name}}
      </template>
    </Table>
  </div>
</template>

<script>
import Vue from 'vue'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'

Vue.use(Viewer)
import {getAttrList, getTypesById, removeAttr} from 'service/attr-service'
import commonMixin from 'utils/mixins'
export default {
  name: 'Attr_list',
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
          key: 'attr_name',
          title: '商品属性名称'
        },
        {
          key: 'attr_type',
          title: '商品属性类型',
          slot: 'type'
        },
        {
          key: 'attr_values',
          title: '商品属性值',
        },
        
        {
          key: 'type_id',
          title: '所属类型',
          slot: 'type_id',
          
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
    let id = this.$route.params && this.$route.params.id
    if(!id) this.loadAttrList({})
    else this.loadTypes(id)
  },
  computed: {
    getAttrType() {
      return function(type) {
        if(type === 0) return '单选'
        if(type === 1) return '多选'
      }
    }
  },
  methods: {
    // 根据类型id获所属属性
    loadTypes(id) {
      getTypesById({id}).then(res => {
        this.data = res.data
      })
    },
    loadAttrList(data) {
      getAttrList(data).then(res => this.data = res.data)
    },
    // 编辑品牌
    handleAttrEdit(row, i) {
      // TODO 
      this.$router.push({path: `/attr/edit/${row.id}`})
    },
    // 删除品牌
    handleAttrRemove(row) {
      this.modalInstance('warning', '您确定要删除该品牌吗？', () => {
        removeAttr({id: row.id}).then(res => {
          this.$Message.success('删除成功', 1500)
          this.loadAttrList({})
        })
      })
      
    },
  }
}
</script>

<style>

</style>