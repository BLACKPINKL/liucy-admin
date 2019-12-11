<template>
  <div>
    <Table border :columns="columns" :data="data">
      <template slot-scope="{row, index}" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="handleFormShow(row, index)">查看</Button>
        <Button type="error" size="small" @click="handleFormRemove(row)">删除</Button>
      </template>
    </Table>
  </div>
</template>

<script>
import {getFormAll, removeForm} from 'service/form-service'
import mixins from 'utils/mixins.js'
export default {
  name: 'devlop_get_form',
  mixins: [mixins],
  data() {
    return {
      data: [],
      columns: [
        {
          title: 'id',
          key: 'id'
        },
        {
          title: '表单名',
          key: 'name'
        },
        {
          title: '生成时间',
          key: 'createTime'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ]
    }
  },
  mounted() {
    this.loadForms({})
  },
  methods: {
    // 加载表单
    loadForms(data) {
      getFormAll(data).then(res => {
        this.data = res.data
      }) 
    },
    // 删除表单
    handleFormRemove(row) {
      this.modalInstance('warning', '你确定要删除这一项吗', () => {
        removeForm({id: row.id}).then(res => {
          this.loadForms({})
        })
        
      })
    },
    // 查看表单
    handleFormShow(row, i) {
      let form = this.data[i].forms
      this.$Modal.confirm({
        title: '表单查看',
        width: '50%',
        render: (h) => {
          return h('formCreate', {
            props: {
              rule: form,
              option: {submitBtn: false}
            }
          })
        }
      })
    },
  }
}
</script>

<style>

</style>