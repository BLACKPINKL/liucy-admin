<template>
  <div>
    <zk-table
      ref="table"
      :data="data"
      :columns="columns"
      stripe
      border
      show-row-hover
      :selection-type="false"
      :tree-type="true"
      :expand-type="false"
      >
      <template slot="show_nav" slot-scope="{row}">
        {{row.show_nav === 1 ? '显示' : '隐藏'}}
      </template>
      <template slot="action" slot-scope="{row}">
        <Button type="error" v-if="!([1, 2, 3].includes(row.id))" @click="handleClickDel(row)">删除</Button>
        <Button type="primary" @click="handleClickEdit(row)">编辑</Button>
      </template>
    </zk-table>
  </div>
</template>

<script>
import {getCate, delCate} from 'service/cate-service'
import ZkTable from 'vue-table-with-tree-grid'
import mixin from 'utils/mixins'
export default {
  name: 'cateModule',
  mixins: [mixin],
  components: {
    ZkTable
  },
  data() {
    return {
      data: [],
      columns: [
        
        {
          label: 'ID',
          prop: 'id'
        },
        {
          label: '分类名称',
          prop: 'cate_name'
        },
        {
          label: '关键词',
          prop: 'keywords'
        },
        {
          label: '描述',
          prop: 'description'
        },
        {
          label: '显示导航',
          prop: 'show_nav',
          type: 'template',
          template: 'show_nav'
        },
        {
          label: '操作',
          prop: 'action',
          type: 'template',
          template: 'action',
        },
      ]
    }
  },
  created() {
    this.loadCateList()
  },
  methods: {
    // 删除
    handleClickDel(row) {
      console.log(row);
      this.modalInstance('warning', '您确定要删除该分类吗？', () => {
        console.log('删除');
        delCate({id: row.id}).then(res => {
          this.msg('success', `删除${row.cate_name}成功`)
          this.loadCateList()
        })
      })
    },
    // 编辑
    handleClickEdit(row) {

    },
    loadCateList() {
      getCate({}).then(res =>{
        // 无限极分类
        let data = res.data
        let tree = []
        data.forEach(item => {
          let children = this.findChildById(data, item.id)
          if(children.length) {
            item.children = children
            tree.push(item)
          }
        })
        this.data = tree
      })
    },
    findChildById(arr = [], id) {
      let res = arr.filter(item => {
        return item.pid === id
      })
      return res
    }
  },
}
</script>

<style>

</style>