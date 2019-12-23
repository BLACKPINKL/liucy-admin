<template>
  <div>
    <CategoryDetail :is-edit="true"></CategoryDetail>
  </div>
</template>

<script>
import CategoryDetail from 'pages/product/category/components/categoryDetail'
export default {
  name: 'category_edit',
  components: {
    CategoryDetail
  }
}
</script>

<style>

</style>