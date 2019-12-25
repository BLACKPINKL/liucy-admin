<template>
  <div>
    <GoodsDetail :is-edit="false"></GoodsDetail>
  </div>
</template>

<script>
import GoodsDetail from 'pages/product/category/components/goodsDetail'
export default {
  name: 'goods_add',
  components: {
    GoodsDetail
  }
}
</script>

<style>

</style>