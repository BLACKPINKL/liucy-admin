<template>
  <div>
    <BrandDetail :isEdit="true"></BrandDetail>
  </div>
</template>

<script>
import BrandDetail from 'pages/product/brand/components/brandDetail'
export default {
  components: {
    BrandDetail
  },
  name: 'product_brand_edit'
}
</script>

<style>

</style>