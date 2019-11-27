<template>
  <div>
    <Modal
    v-model="show"
    :title="title"
    :ok-text="okText"
    width="80%"
    @on-ok="handlePraSubmit"
    >
      <Table border :columns="columns" :data="data">
        <slot></slot>
      </Table>
      <div v-if="showPage" class="modal_page">
        <Page :current.sync="currentPage" :total="pageTotal" show-elevator @on-change="handlePagechange"/>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'modal_table',
    props: {
      columns: {
        type: Array,
        default: () => []
      },
      data: {
        type: Array,
        default: () => []
      },
      title: {
        type: String,
        default: ''
      },
      okText: {
        type: String,
        default: '提交'
      },
      showPage: {
        type: Boolean,
        default: false
      },
      pageTotal: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        show: false,
        loading: true,
        currentPage: 1
      }
    },
    watch: {
      show(val) {
        console.log(val);
        
        this.currentPage = 1
      }
    },
    methods: {
      // 显示modal
      showModal() {
        this.show = true
      },
      handlePraSubmit() {
        this.$emit('handleModalSubmit')
      },
      // 页码变化
      handlePagechange(page) {
        let limit = (page - 1) * 10
        this.$emit('handlePageChange', limit)
      }
    },
  }
</script>

<style lang="less" scoped>
.modal_page {
  margin: 15px 0 0 0;
  display: flex;
  justify-content: flex-end;
}
</style>