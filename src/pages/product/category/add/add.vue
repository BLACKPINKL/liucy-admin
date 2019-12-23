<template>
  <div>
    <CategoryDetail :is-edit="false"></CategoryDetail>
  </div>
</template>

<script>
import CategoryDetail from 'pages/product/category/components/categoryDetail'
export default {
  name: 'category_add',
  components: {
    CategoryDetail
  }
}
</script>

<style>

</style>