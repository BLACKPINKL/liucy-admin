<template>
  <div>
    <Row style="margin: 0 0 15px 0">
      <Col :span="span">
        <Input 
        search 
        @on-search="handleSearch" 
        v-model="value" 
        enter-button :placeholder="placeHolder"/>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: 'search',
    props: {
      placeHolder: {
        type: String,
        default: ''
      },
      span: {
        type: [String, Number],
        default: 8
      }
    },
    data() {
      return {
        value: ''
      }
    },
    methods: {
      // 点击搜索触发
      handleSearch() {
        this.$emit('handleSearch', this.value)
      }
    }
  }
</script>

<style lang="less" scoped>

</style>